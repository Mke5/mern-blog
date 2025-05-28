import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo'>
          <h2>Mke5</h2>
        </Link>

        <ul className="nav__menu">
          <li><Link to="/profile/mike">Mike Prime</Link></li>
          <li><Link to="/create">Create Post</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>

        <button className="nav__toggle-btn">
          <AiOutlineClose />
        </button>
      </div>
    </nav>
  )
}

export default Header
