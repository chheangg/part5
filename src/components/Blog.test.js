import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  test('render blog\'s title and author only', () => {
    const blog = {
      title: 'A Game Of Thrones',
      author: 'George RR Martin',
      url: '123',
      likes: 0,
      user: {
        name: 'Chheang',
        id: 123,
      }
    }

    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    const showDelete = true

    const { container } = render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDelete={showDelete} />
    )

    const title = screen.getByText('A Game Of Thrones', { exact: false })
    const author = screen.getByText('George RR Martin', { exact: false })

    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const blogDetail = container.querySelector('.blog-detail')
    expect(blogDetail).toHaveStyle('display: none')
  })
})