import React from 'react'

const SubmitBtn = (props) => {
  return (
    <button type="submit" className="bg-custom-green-600 text-custom-white py-2 px-6 rounded transition hover:bg-custom-grey-900 hover:scale-105 active:scale-95">
        <span>{props.children != null ? props.children : props.text}</span>
    </button> 
  )
}

export default SubmitBtn
