import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('check form detail on click', async () => {
  const blog = {
    title: 'A Clash of King',
    author: 'George RR Martin',
    url: '123.com'
  }

  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm addBlog={addBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const submitBtn = screen.getByRole('button', { name: 'create' })

  await user.type(titleInput, 'A Clash of King')
  await user.type(authorInput, 'George RR Martin')
  await user.type(urlInput, '123.com')
  await user.click(submitBtn)

  expect(addBlog.mock.calls[0][0]).toEqual(blog)

})