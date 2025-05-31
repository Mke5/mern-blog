import React, { useState } from 'react'

const EditPost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const postsCate = ['Art', 'Bussines', 'Weather', 'Investment', 'Uncategorized', 'Agriculture']
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form__error-message">Error Message</p>

        <form action="" className="form create-post__form">
          <input type="text" name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" id="" value={category} onChange={e => setCategory(e.target.value)} >
            {
              postsCate.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <textarea placeholder='Body' rows={7} name="body" id="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          <input type="file" name="" id="" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg' />
          <button type='submit' className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost