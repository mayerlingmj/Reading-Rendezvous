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
      <nav>
        <Link to="/auth">Auth</Link>
        <Link to="/books">Books</Link>
        <Link to="/discussions">Discussions</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/comments">Comments</Link>
      </nav>
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
