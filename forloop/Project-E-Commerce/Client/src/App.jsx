
import './App.css'
import LandingPage from './Client-page/LandingPage'
import ProductsAdd from './Admin-page/ProductsAdd'
import { Route, Router, BrowserRouter, Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<LandingPage />} />
          <Route path='/productAdd' element={<ProductsAdd />} />
        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
