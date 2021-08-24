import React from 'react'

const Photo = ({ item }) => {
  const {
    urls: { regular },
    likes,
    user: {
      username,
      links: { html },
      profile_image: { small },
    },
  } = item

  return (
    <article className='photo'>
      <img src={regular} alt={username} />
      <div className='photo-info'>
        <div>
          <h4>{username}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={html}>
          <img src={small} alt={username} className='user-img' />
        </a>
      </div>
    </article>
  )
}

export default Photo
