import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./components/Login"
import Registration from "./components/Registration"
import RolikList from "./components/RolikList"
import RolikPage from "./components/RolikPage"
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <Router>
      <Route exact path="/" component={RolikList} />
      <Route path="/rolik/:id" component={RolikPage} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/user/:id" component={UserProfile} />
    </Router>
  )
}

export default App
