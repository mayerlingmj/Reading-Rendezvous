import React from 'react'

const HomePage = () => {
  const backgroundImage = 'https://i.imgur.com/92kPgWK.jpg'

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        padding: '10px',
        marginBottom: '20px'
      }}
    >
      <h2>About Reading Rendezvous Book Club</h2>
      <p>
        Reading Rendezvous is a book club for those who love to immerse
        themselves in literature. Our community is made up of passionate readers
        and thinkers. We focus on exploring the works of a variety of authors,
        from classic literature to contemporary pieces, and from well-known
        writers to up-and-coming authors. We believe that reading is a journey,
        and each book is an adventure that broadens our perspective and enriches
        our understanding of the world. Our members come from all walks of life,
        united by a common love for books. Join us on this exciting literary
        journey and be a part of the Reading Rendezvous Book Club!
      </p>
    </div>
  )
}

export default HomePage
