import { useState } from "react"

const Blog = ({blog, updateBlog}) => {
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
      <div style={showWhenVisibile}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => updateBlog({...blog, user: blog.user.id, likes: blog.likes + 1})}>Like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}


export default Blog