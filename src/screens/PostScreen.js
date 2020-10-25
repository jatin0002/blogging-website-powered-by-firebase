import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Card, Button } from 'react-bootstrap'
import { useFirestore } from 'react-redux-firebase'
import { Markup } from 'interweave'
import Comment from '../components/Comment'
import Loader from '../components/Loader'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostScreen = ({ match }) => {
  const firestore = useFirestore()
  const auth = useSelector((state) => state.firebase.auth)

  const history = useHistory()
  const [post, setPost] = useState({})

  const loadPost = async () => {
    try {
      const docRef = firestore.collection('posts').doc(match.params.id)
      const result = await docRef.get()
      if (result.exists) {
        setPost(result.data())
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.log('Error getting document:', error)
    }
  }

  useEffect(() => {
    loadPost()
  }, [])

  if (Object.keys(post).length === 0) {
    return <Loader />
  }

  const deleteStudent = async (id) => {
    try {
      await firestore.collection('posts').doc(match.params.id).delete()
      history.push('/')
    } catch (error) {
      console.error('Error removing document: ', error)
    }
  }

  return (
    <>
      <Container className="my-2">
        <Button
          className="my-3"
          onClick={() => {
            history.push('/')
          }}>
          BACK
        </Button>
        <Row>
          <Col md={6} sm={12} lg={12}>
            <h3>{post.title}</h3>
            <div className="desc py-2">{post.description}</div>
            <Row>
              <Col lg={2} md={6}>
                <p className="info">By: {post.username}</p>
              </Col>
              <Col lg={2} md={6}>
                <p className="info">At: {post.date}</p>
              </Col>
            </Row>
            <Card className="p-4  ">
              <Markup content={post.content} />
            </Card>
          </Col>
        </Row>
        {auth.uid && auth.uid === post.userId ? (
          <Row>
            <Col md={3} lg={2}>
              <Button
                variant="warning"
                className="my-2"
                onClick={() => {
                  history.push(`editpost/${match.params.id}`)
                }}>
                Edit
              </Button>
            </Col>
            <Col md={3} lg={2}>
              <Button variant="danger" className="my-2" onClick={deleteStudent}>
                Delete
              </Button>
            </Col>
          </Row>
        ) : null}

        <Comment id={match.params.id} />
      </Container>
    </>
  )
}

export default PostScreen
