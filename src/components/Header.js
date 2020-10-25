import React, { useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import fireBase from 'firebase'
function Header() {
  const auth = useSelector((state) => state.firebase.auth)
  const firebase = useFirebase()
  const history = useHistory()
  const login = () => {
    let provider = new fireBase.auth.GoogleAuthProvider()
    fireBase.auth().signInWithPopup(provider)
  }
  const logout = () => {
    firebase.logout()
    history.push('/')
  }
  useEffect(() => {}, [history])
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <h4 className="title">Dev Journal</h4>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto nav__option">
              {auth.uid ? (
                <LinkContainer to="/createpost">
                  <Nav.Link>
                    <i className="fas fa-plus-square"></i> &nbsp;Create Post
                  </Nav.Link>
                </LinkContainer>
              ) : null}
              {!auth.uid ? (
                <div onClick={login} className="header__nav__option">
                  <i className="fas fa-user"></i> &nbsp;Sign In
                </div>
              ) : (
                <div className="nav__option__log">
                  <Avatar
                    className="profile__logo"
                    src={auth.photoURL}
                    round={true}
                    size="40"
                  />
                  <div onClick={logout} className="header__nav__option">
                    <i className="fas fa-sign-out-alt"></i> &nbsp;Logout
                  </div>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
