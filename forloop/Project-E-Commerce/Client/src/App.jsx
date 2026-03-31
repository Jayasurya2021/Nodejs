
import './App.css'
import LandingPage from './Client-page/LandingPage'
import ProductsAdd from './Admin-page/ProductsAdd'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Register from './Client-page/Register'
import Login from './Client-page/Login'
function App() {


  return (
    <>
      <ToastContainer
       
      />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/productAdd' element={<ProductsAdd />} />
          <Route path='/clientRegister' element={<Register />} />
          <Route path='/clientlogin' element={<Login />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
