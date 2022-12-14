import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => setVisible(!visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      handleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleVisibility}>
          {props.buttonText}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable