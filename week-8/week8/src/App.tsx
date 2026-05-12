import './App.css'
import {Timer} from "./timer.tsx";
import {Timer2} from "./timer2.tsx";

function App() {
  return (
    <>
      <Timer initialSeconds={2}/>
      <Timer2 initialSeconds={2}/>
    </>
  )
}

export default App
