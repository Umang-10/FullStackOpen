const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    // let blogObject = new Blog(helper.initialBlogs[0])
    // await blogObject.save()
    // blogObject = new Blog(helper.initialBlogs[1])
    // await blogObject.save()
})

describe('Get Blog Information', () => {
    test('there are two blogs', async() => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('there are ids for each blog', async () => {
        const blogs = await Blog.find({})

        expect(blogs[0]._id).toBeDefined()
    })
})

describe('A Valid Blog can be Added', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Four Hour Work Week',
            author: 'Tim Ferris',
            url: 'fourhourworkweek.com/blog',
            likes: 420
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Four Hour Work Week'
        )
    })

    test('If the likes property is missing, it will default to 0', async () => {
        const newBlog = {
            title: 'Four Hour Work Week',
            author: 'Tim Ferris',
            url: 'fourhourworkweek.com/blog',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = await blogsAtEnd.find(blog => blog.title === 'Four Hour Work Week')
        expect(addedBlog.likes).toBe(0)
    })

    test('blog without title and url is not added', async () => {
        const newBlog = {
            author: 'Tim Ferris',
            likes: 420
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(500)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deletion of a Blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        // const blog_title = 'Testting'

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    }, 100000)
})

describe('Updation of Blog', () => {
    test('Blog update successful', async () => {
        const newBlog = {
            title: 'Tim Ferris Blog',
            author: 'Tim Ferris',
            url: 'tim.blog',
            likes: 420
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const allBlogs = await helper.blogsInDb()
        const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

        const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const foundBlog = blogsAtEnd.find(blog => blog.likes === 421)
        expect(foundBlog.likes).toBe(421)
    })
})

afterAll(() => {
    mongoose.connection.close()
})