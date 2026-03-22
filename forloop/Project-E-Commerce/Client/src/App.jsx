
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
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-gray-900 text-white rounded-xl shadow-lg px-4 py-3"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-green-500"
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
