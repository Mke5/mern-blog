import React, { useState } from 'react'
import DumyPosts from '../data'
import PostItem from '../components/PostItem'

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DumyPosts)

  return (
    <section>
      {posts.length > 0 ?
      <div className="container posts__container">
        {
          posts.map(({id, thumbnail, category, title, desc, authorId}) => <PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorId={authorId} />)
        }
      </div>
      : <h2 className='center'>No Posts Yet</h2>}
    </section>
  )
}

export default AuthorPosts