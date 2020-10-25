import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

// Importing components or actions
import FormContainer from '../components/FormContainer'

const CreatePostScreen = ({ history }) => {
  const firestore = useFirestore()
  const auth = useSelector((state) => state.firebase.auth)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  useFirestoreConnect([{ collection: 'posts', orderBy: ['createdAt', 'desc'] }])

  let post = {
    username: auth.displayName,
    title: title,
    description: description,
    content: content,
    date: moment().format('DD-MM-YYYY'),
    userId: auth.uid,
    photoURL: auth.photoURL,
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    firestore
      .collection('posts')
      .add({ ...post, createdAt: firestore.FieldValue.serverTimestamp() })
    setTitle('')
    setDescription('')
    setContent('')
    history.push('/')
  }
  return (
    <FormContainer mdValue={12}>
      <h1>Create Post</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>
        <Editor
          apiKey="cbea9mc2ggrrrxfnscyjuk8170r8odauy7b3mkcurvj0slau"
          value={content}
          onEditorChange={(e) => setContent(e)}
          init={{
            min_height: 500,
            plugins: [
              'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
              'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
              'table emoticons template  help',
            ],
            toolbar:
              'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image | print preview media fullpage | ' +
              'forecolor backcolor emoticons | help',
            menu: {
              favs: {
                title: 'My Favorites',
                items:
                  'code visualaid | searchreplace | spellchecker | emoticons',
              },
            },
            menubar: 'favs file edit view insert format tools table help',
          }}
        />
        <Button type="submit" variant="primary" className="my-2">
          Create
        </Button>
      </Form>
    </FormContainer>
  )
}

// export default CreatePostScreen
export default React.memo(CreatePostScreen)
