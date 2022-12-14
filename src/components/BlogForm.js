import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>title:</label>
      <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)}></input>
      <br></br>
      <label htmlFor='author'>author:</label>
      <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
      <br></br>
      <label htmlFor='url'>url  :</label>
      <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)}></input>
      <br></br>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm