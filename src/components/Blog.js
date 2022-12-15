import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, showDelete }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisibile = { display: showDetail ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetail(!showDetail)}>view</button>
      </div>
      <div style={showWhenVisibile} className='blog-detail'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => updateBlog({ ...blog, user: blog.user.id, likes: blog.likes + 1 })}>Like</button></div>
        <div>{blog.user.name}</div>
        {showDelete ? <button onClick={() => deleteBlog({ ...blog })}>remove</button> : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
}


export default Blog