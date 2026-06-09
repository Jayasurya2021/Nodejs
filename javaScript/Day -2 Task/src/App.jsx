import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RegisterForm from './compoenents/RegisterForm'
import ProductPrice from './compoenents/ProductPrice'
import GradeSystem from './compoenents/GradeSystem'
import SalaryBonus from './compoenents/SalaryBonus'
import Todo from './compoenents/todo'
import ApiFetching from './compoenents/ApiFetching'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterForm />
      <ProductPrice />
      <GradeSystem/>
      <SalaryBonus/>
      <Todo/>
      <ApiFetching/>
    </>
  )
}

export default App
