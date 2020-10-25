import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import FormContainer from './FormContainer'
import ShowComments from './ShowComments'

const Comment = ({ id }) => {
  const firestore = useFirestore()
  const auth = useSelector((state) => state.firebase.auth)

  const docRef = firestore.collection('posts').doc(id).collection('comments')
  const [comment, setComment] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (comment === '') {
      alert('Field cannot be empty')
      return
    }
    docRef.add({
      username: auth.displayName,
      userId: auth.uid,
      comment: comment,
      timestamps: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setComment('')
  }

  return (
    <FormContainer mdValue={12}>
      <h6>Comments</h6>
      <Form>
        <Form.Group controlId="title">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}></Form.Control>
        </Form.Group>
        <Button onClick={onSubmitHandler} size="sm">
          Comment
        </Button>
      </Form>

      <ShowComments id={id} />
    </FormContainer>
  )
}

export default React.memo(Comment)
