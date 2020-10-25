import { Row, Col, Dropdown, Card } from 'react-bootstrap'
import React from 'react'
import Loader from '../components/Loader'
const commentCard = ({ comment, authId, deleteComment }) => {
  return (
    <>
      {comment ? (
        <Card className="my-3 p-2">
          <Row className="c__sec">
            <Col>
              <p>By: {comment.username}</p>
            </Col>
            <Col>
              <p>At: {new Date(comment.timestamps?.toDate()).toUTCString()}</p>
            </Col>
            {authId === comment.userId ? (
              <Col className="d-flex justify-content-end">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="warning"
                    size="sm"
                    id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        deleteComment(comment.id)
                      }}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            ) : null}
          </Row>
          <Card.Text>{comment.comment}</Card.Text>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default commentCard
