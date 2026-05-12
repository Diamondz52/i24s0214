import {useEffect, useState} from 'react'
import {displayUser, displayUsers} from './api.ts'
function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
      displayUser();
      displayUsers()
  }, []);
  return (
    <>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
    </>
  )
}

export default App
