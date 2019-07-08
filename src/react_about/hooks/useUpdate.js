import { useRef, useEffect } from 'react'
function useUpdate(fn) {
  const mounting = useRef(true)
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false
    } else {
      fn()
    }
  })
}

export default useUpdate
