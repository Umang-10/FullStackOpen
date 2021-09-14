const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '6121f899d915162f907b276d',
        title: 'Farnam Street',
        author: 'Shane Parrish',
        url: 'https://fs.blog/',
        likes: 69,
        __v: 0
    },
    {
        _id: '61236fc1cde5bf3300020ea5',
        title: 'Wait But Why',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/',
        likes: 7,
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}