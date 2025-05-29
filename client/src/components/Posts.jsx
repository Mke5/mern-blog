import React, { useState } from 'react'
import PostItem from './PostItem'
import DumyPosts from '../data'


const Posts = () => {
  const [posts, setPosts] = useState(DumyPosts)
  return (
    <section className="posts">
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

export default Posts
