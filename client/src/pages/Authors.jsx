import React, { useState } from 'react'
import avatar from '../images/avatar1.jpg'
import { Link } from 'react-router-dom'

const authorsData = [
  {id: 1, avatar: avatar, dname: 'Mike Lame', posts: 3}
]

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData)
  return (
    <section className="authors">
      {
        authors.length > 0 ? <div className="container authors__container">
                              {
                                authors.map(({id, avatar, dname, posts}) => {
                                  return <Link to={`/posts/users/${id}`} key={id} className='author'>
                                    <div className="author__avatar">
                                      <img src={avatar} alt="" />
                                    </div>

                                    <div className="author__info">
                                      <h4>{dname}</h4>
                                      <p>{posts}</p>
                                    </div>
                                  </Link>
                                })
                              }
                            </div> : <h2 className='center'>No Users yet</h2>
      }
    </section>
  )
}

export default Authors