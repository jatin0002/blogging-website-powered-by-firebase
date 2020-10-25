import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// Importing all the
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import EditPostScreen from './screens/EditPostScreen'
import PostScreen from './screens/PostScreen'
import { useSelector } from 'react-redux'

function App() {
  const auth = useSelector((state) => state.firebase.auth)

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            {auth.uid ? (
              <Route path="/createpost" component={CreatePostScreen} />
            ) : null}
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/:id" component={PostScreen} />
            {auth.uid ? (
              <Route exact path="/editpost/:id" component={EditPostScreen} />
            ) : null}
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
