import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer>
      <Container className="footer" fluid>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Dev Journal</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
