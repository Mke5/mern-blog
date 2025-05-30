import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../images/avatar2.jpg'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

const UserProfile = () => {
  const [img2, setImg] = useState(img)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/sdsds`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={img2} alt="" />
            </div>

            <form action="" className='avatar__form'>
              <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])}/>
              <label htmlFor="avatar"><FaEdit /></label>
            </form>

            <button className='profile__avatar-btn'><FaCheck /></button>
          </div>

          <h1>Current Username</h1>

          <form action="" className="form profile__form">
            <p className="form__error-message">This is an Error Message</p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setName(e.target.value)}/>
            <input type="password" placeholder='Current Password' value={name} onChange={e => setName(e.target.value)}/>
            <input type="password" placeholder='New Password' value={name} onChange={e => setName(e.target.value)}/>

            <button type="submit" className='btn primary'>Update</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
