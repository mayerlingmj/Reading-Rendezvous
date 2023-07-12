import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Auth from './components/Auth'
import Books from './components/Books'
import Discussions from './components/Discussions'
import Reviews from './components/Reviews'
import Comments from './components/Comments'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/discussions">
          <Discussions />
        </Route>
        <Route path="/reviews">
          <Reviews />
        </Route>
        <Route path="/comments">
          <Comments />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
