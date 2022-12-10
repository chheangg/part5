const Notification = ({ message, error }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={`notification${error === true ? ' error' : ''}`}>
      {message}
    </div>
  )
}

export default Notification