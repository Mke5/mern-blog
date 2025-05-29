import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import img from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />

          <div className="post-detail__buttons">
            <Link to={`/post/new/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/post/new/edit`} className='btn sm danger'>Delete</Link>
          </div>
        </div>

        <h1>Post Tilte</h1>
        <div className="post-detail__thumbnail">
          <img src={img} alt="" />
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur error nobis laborum quibusdam qui cum minus eligendi nesciunt molestiae odit, porro debitis dolorum necessitatibus praesentium aliquid minima officia dignissimos voluptate quia quisquam consequuntur. Expedita nihil numquam eum sequi deleniti officiis consequuntur, quos quaerat voluptatum ducimus qui dicta impedit delectus minima dolor? Molestiae quia ullam rerum.
        </p>
      </div>
    </section>
  )
}

export default PostDetail
