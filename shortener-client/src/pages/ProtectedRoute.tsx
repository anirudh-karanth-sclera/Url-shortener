import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ children }:{children:ReactElement}) => {
 const token = localStorage.getItem("token")
  if (!token){
    return <Navigate to='/' />
  }
  return children
}

export default ProtectedRoute








