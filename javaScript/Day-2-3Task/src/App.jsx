import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RegisterForm from './day-2/RegisterForm'
import ProductPrice from './day-2/ProductPrice'
import GradeSystem from './day-2/GradeSystem'
import SalaryBonus from './day-2/SalaryBonus'
import Todo from './day-2/todo'
import ApiFetching from './day-2/ApiFetching'
import EmployeeRegistration from './day-3/EmployeeRegistration'
import SearchProducts from './day-3/SearchProducts'
import UserDataFetch from './day-3/UserDataFetch'
import DarkMode from './day-3/DarkMode'
import SearchTracker from './day-3/SearchTracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* day 2 */}
      {/* <RegisterForm />
      <ProductPrice />
      <GradeSystem/>
      <SalaryBonus/>
      <Todo/>
      <ApiFetching/> */}

      {/* day 3 */}
      <EmployeeRegistration/>
      <SearchProducts/>
      <UserDataFetch/>
      <DarkMode/>
      <SearchTracker/>



    </>
  )
}

export default App
