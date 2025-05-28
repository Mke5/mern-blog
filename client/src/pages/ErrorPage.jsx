import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <h2>Oops Page Not Found</h2>
        <Link to='/' className='btn primary'>Home</Link>
      </div>
    </section>
  )
}

export default ErrorPage