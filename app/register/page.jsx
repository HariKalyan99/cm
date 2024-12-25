import RegisterForm from '@components/RegisterForm'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const Register = () => {
  return (
    <>
    <RegisterForm />
    <Toaster />
    </>
  )
}

export default Register