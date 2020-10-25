import React, { useState, useEffect } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import CommentCard from './CommentCard'

const ShowComments = ({ id }) => {
  const [comments, setComments] = useState([])

  const auth = useSelector((state) => state.firebase.auth)
  const firestore = useFirestore()
  const docRef = firestore.collection('posts').doc(id).collection('comments')

  const deleteComment = async (id) => {
    try {
      await docRef.doc(id).delete()
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  useEffect(() => {
    if (id) {
      try {
        docRef.orderBy('timestamps').onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        })
      } catch (error) {
        console.log('Error getting document:', error)
      }
    }
    const controller = new AbortController()
    return () => {
      controller.abort()
    }
  }, [id])

  return (
    <>
      {comments.map((x) => (
        <CommentCard
          key={x.id}
          comment={x}
          authId={auth.uid}
          deleteComment={deleteComment}
        />
      ))}
    </>
  )
}

export default React.memo(ShowComments)
