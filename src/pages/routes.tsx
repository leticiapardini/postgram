import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from './home'
import { Login } from './login'
import { Register } from './register'

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}