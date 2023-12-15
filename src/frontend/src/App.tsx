import { useState } from 'react'
import viteLogo from '/safari-pinned-tab.svg'

function App() {
  const [count, setCount] = useState(0)
  console.log('🚀 ~ App ~ count:', count)
  console.log('🚀 ~ process.env:', import.meta.env)
  console.log('🚀 ~ process.env.DFX_NETWORK:', import.meta.env.DFX_NETWORK)

  return (
    <>
      <div>
        <div>
          <img src={viteLogo} className="logo" alt="Vite logo" width="100px" />
        </div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
