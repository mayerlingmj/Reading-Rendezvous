import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Comments = () => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const result = await axios.get('/comments')
      setComments(result.data)
    }

    fetchComments()
  }, [])

  return (
    <div>
      {comments.map((comment, index) => (
        <p key={index}>{comment.title}</p>
      ))}
    </div>
  )
}
export default Comments
