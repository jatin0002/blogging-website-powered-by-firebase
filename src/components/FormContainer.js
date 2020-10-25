import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
const FormContainer = ({ children, mdValue }) => {
  return (
    <Container className="py-5 fcname">
      <Row className="justify-content-md-center ">
        <Col xs={12} md={mdValue ? 12 : 6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
