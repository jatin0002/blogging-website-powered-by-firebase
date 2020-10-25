import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Editor } from '@tinymce/tinymce-react'
import moment from 'moment'
import { useFirestore } from 'react-redux-firebase'

// Importing components or actions
import FormContainer from '../components/FormContainer'

const EditPostScreen = ({ history, match }) => {
  const firestore = useFirestore()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const loadPost = async () => {
    try {
      const docRef = firestore.collection('posts').doc(match.params.id)
      const result = await docRef.get()
      if (result.exists) {
        setTitle(result.data().title)
        setDescription(result.data().description)
        setContent(result.data().content)
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.log('Error getting document:', error)
    }
  }
  useEffect(() => {
    if (match.params.id) {
      loadPost()
    }
  }, [match.params.id])

  let post = {
    username: 'Jatin Pratap Singh',
    title: title,
    description: description,
    content: content,
    date: moment().format('DD-MM-YYYY'),
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    firestore
      .collection('posts')
      .doc(match.params.id)
      .update({
        ...post,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })

    setTitle('')
    setDescription('')
    setContent('')
    history.push(`/${match.params.id}`)
  }
  return (
    <FormContainer mdValue={12}>
      <h1>Update Post</h1>
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
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}

export default React.memo(EditPostScreen)
