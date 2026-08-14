import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProdivder from './compoenents/userProvider.jsx'
import Profile from './compoenents/Profile.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
<UserProdivder>
  <h1>
    this is app
  </h1>
   <App />
</UserProdivder>
   

   <>
   this is profile
   </>
      <Profile/>  

   
  </StrictMode>,
)
