import React from 'react'

function Loader() {
  return (
    <div id="loader"
  className="flex justify-center items-center h-screen"
>
  <div
    className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
</div>

  )
}

export default Loader