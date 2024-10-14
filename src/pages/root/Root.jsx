
import { Outlet } from 'react-router-dom'
import Footer from '../share/Footer'
import Navbar from '../share/Navbar'

export default function Root() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
