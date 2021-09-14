const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const listWithTwoBlog = [{
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

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithTwoBlog)
        expect(result).toBe(76)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const listWithManyBlog = [{
            _id: '6121f899d915162f907b276d',
            title: 'Farnam Street',
            author: 'Shane Parrish',
            url: 'https://fs.blog/',
            likes: 6,
            __v: 0
        },
        {
            _id: '61236fc1cde5bf3300020ea5',
            title: 'Wait But Why',
            author: 'Tim Urban',
            url: 'https://waitbutwhy.com/',
            likes: 7,
            __v: 0
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
    ]

    test('among one blog is the blog itself', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0][0])
    })

    test('among empty list', () => {
        expect(listHelper.favoriteBlog([])).toEqual('No blogs')
    })

    test('among a bigger list is shown right', () => {
        const result = listHelper.favoriteBlog(listWithManyBlog)
        expect(result).toEqual(listWithManyBlog[0][2])
    })
})

describe('most blogs by author', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const listWithManyBlog = [{
            _id: '6121f899d915162f907b276d',
            title: 'Farnam Street',
            author: 'Shane Parrish',
            url: 'https://fs.blog/',
            likes: 6,
            __v: 0
        },
        {
            _id: '61236fc1cde5bf3300020ea5',
            title: 'Wait But Why',
            author: 'Tim Urban',
            url: 'https://waitbutwhy.com/',
            likes: 7,
            __v: 0
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
    ]

    test('among one blog is the blog itself', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: listWithOneBlog[0]['author'],
            blogs: 1
        })
    })

    test('among empty list', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })

    test('among a bigger list is shown right', () => {
        const result = listHelper.mostBlogs(listWithManyBlog)
        expect(result).toEqual({
            author: listWithManyBlog[2]['author'],
            blogs: 3
        })
    })
})

describe('most liked author', () => {
    const listWithOneBlog = [{
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]

    const listWithManyBlog = [{
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
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
    ]

    test('among one blog is the blog itself', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: listWithOneBlog[0]['author'],
            likes: listWithOneBlog[0]['likes']
        })
    })

    test('among empty list', () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })

    test('among a bigger list is shown right', () => {
        const result = listHelper.mostLikes(listWithManyBlog)
        expect(result).toEqual({
            author: listWithManyBlog[0]['author'],
            likes: listWithManyBlog[0]['likes']
        })
    })
})