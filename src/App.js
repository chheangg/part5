import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password})
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')   
    } catch (exceptions) {
      console.log(exceptions)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>username</label>
          <input id='username' type='text' value={username} onChange={({target}) => setUsername(target.value)}></input>
          <br></br>
          <label htmlFor='password'>password</label>
          <input id='password' type='password' value={password} onChange={({target}) => setPassword(target.value)}></input>
          <br></br>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
