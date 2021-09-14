const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.length === 0
        ? 0
        : blogs.map((blogLikes) => blogLikes['likes']).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = (blog) => {
        return blog.indexOf(Math.max(blog.map((b) => b['likes'])))
    }

    return blogs.length === 0
        ? 'No blogs'
        : blogs[0][maxLikes]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }else {
        const author_arr = blogs.map(blog => blog['author'])
        const author_dict = {}

        for (let i = 0;i < author_arr.length; i++){
            if (Object.keys(author_dict).includes(author_arr[i])) {
                author_dict[author_arr[i]] += 1
            }else{
                author_dict[author_arr[i]] = 1
            }
        }

        const blog_arr = Object.values(author_dict)
        const most_blogs = Math.max(...blog_arr)
        const max_author = Object.keys(author_dict).find(key => author_dict[key] === most_blogs)

        return {
            author: max_author,
            blogs: most_blogs
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }else {
        const dict = blogs.map(blog => {
            return {
                'author': blog['author'],
                'likes': blog['likes']
            }
        })
        const likes_arr = blogs.map(blog => blog['likes'])
        const most_likes = Math.max(...likes_arr)

        return dict[likes_arr.indexOf(most_likes)]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}