import { useState, useEffect } from 'react'
import './styles/index.css' 
import Notification from './components/Notification'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('BlogLoggedinUser'))
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const showNotification = (message, error) => {
    setMessage(message)
    setError(error)
    setTimeout(() => setMessage(null), 5000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password})

      // Set token in app and localStorage and clear out form
      window.localStorage.setItem('BlogLoggedinUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')   
    } catch (exceptions) {
      console.log(exceptions)
      const error = 'wrong username or password'
      showNotification(error, true)
    }
  }
  
  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('BlogLoggedinUser')
    blogService.setToken(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({title, author, url})
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, newBlog])
      showNotification(`a new blog ${title} by ${author}`, false)
    } catch (exceptions) {
      console.log(exceptions)
      showNotification('Incorrect title, author, or url', true)
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

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged in</p>
          <button type='submit'>logout</button>
        </form>

        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>title:</label>
          <input id='title' type='text' value={title} onChange={({target}) => setTitle(target.value)}></input>
          <br></br>
          <label htmlFor='author'>author:</label>
          <input id='author' type='text' value={author} onChange={({target}) => setAuthor(target.value)}></input>
          <br></br>
          <label htmlFor='url'>url  :</label>
          <input id='url' type='text' value={url} onChange={({target}) => setUrl(target.value)}></input>
          <br></br>
          <button type='submit'>create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />

      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
