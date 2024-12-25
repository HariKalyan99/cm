"use client"
import LoginForm from '@components/LoginForm';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const Home = () => {
  return (
    <main>
      <LoginForm />
      <Toaster />
    </main>
  )
}

export default Home
