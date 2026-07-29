import React from 'react'
import logoImg from './assets/logo-blue-100 (1).png'

function Logo({ width = '100px' }) {
  return (
    <img src={logoImg} alt="Logo" style={{ width }} />
  )
}

export default Logo