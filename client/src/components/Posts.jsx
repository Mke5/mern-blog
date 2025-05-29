import React, { useState } from 'react'
import thumbnail1 from '../images/blog1.jpg'
import PostItem from './PostItem'

const DumyPosts = [
  {
    id: '1',
    thumbnail: thumbnail1,
    title: 'This is a Tiltlesgdgskj dksdkjksk kdjgskgjdhkjhdhuiuhsiudgiuvkuskd jhsd sdjhs jbdjbsbj sbdshjdhshjd jsbjdbjs djbsbdjsbjd',
    desc: 'New Test',
    category: 'Art',
    authorId: 2
  }
]

const Posts = () => {
  const [posts, setPosts] = useState(DumyPosts)
  return (
    <section className="posts">
      <div className="container posts__container">
        {
          posts.map(({id, thumbnail, category, title, desc, authorId}) => <PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorId={authorId} />)
        }
      </div>
    </section>
  )
}

export default Posts
