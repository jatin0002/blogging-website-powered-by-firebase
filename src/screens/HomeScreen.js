import React from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Avatar from 'react-avatar'
import Loader from '../components/Loader'

const HomeScreen = ({ history }) => {
  const posts = useSelector((state) => state.firestore.ordered.posts)

  useFirestoreConnect([{ collection: 'posts', orderBy: ['createdAt', 'desc'] }])

  if (!posts) {
    return <Loader />
  }

  return (
    <Container>
      {posts.map((post) => (
        <Card key={post.id} className="py-2 my-3">
          <Row>
            <Col md={4} sm={0} lg={2}>
              <div className="avatar">
                {post.photoURL ? (
                  <Avatar src={post.photoURL} round={true} />
                ) : (
                  <Avatar name={post.username} color="#343A40" round={true} />
                )}

                <p>{post.username}</p>
              </div>
            </Col>
            <Col md={8} sm={12} lg={10}>
              <Card.Body>
                <Card.Title>
                  <h4>{post.title}</h4>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>

                <Button
                  variant="primary"
                  onClick={() => {
                    history.push(`/${post.id}`)
                  }}>
                  Read More
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  )
}

export default HomeScreen
