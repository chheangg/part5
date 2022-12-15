import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

  test('render blog\'s detail', async () => {
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

    const user = userEvent.setup()
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    const showDelete = true

    render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDelete={showDelete} />
    )

    const openButton = screen.getByRole('button', { name: 'view' })
    await user.click(openButton)

    const url = screen.getByText('123')
    const likes = screen.getByText('likes 0')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('likes button pressed twice', async () => {
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

    const user = userEvent.setup()
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    const showDelete = true

    const { container } = render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} showDelete={showDelete} />
    )

    const openButton = screen.getByRole('button', { name: 'view' })
    await user.click(openButton)

    const likes = container.querySelector('.likes')
    expect(likes.textContent).toEqual('likes 0')

    const likeButton = screen.getByRole('button', { name: 'Like' })

    await user.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(1)

    await user.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})