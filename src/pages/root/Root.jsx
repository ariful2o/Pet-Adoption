import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../share/Navbar'

export default function Root() {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
    </div>
  )
}
