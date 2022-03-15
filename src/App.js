import { Fragment, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
  
  const [users, setUsers] = useState([])
  const [user,setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [alert,setAlert] = useState(null)
  


  // search Github users
  const searchUsers = async username => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/search/users?q=${username}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    setUsers(res.data.items)
    setLoading(false)
  }

  // get single Github user
  const getUser = async username => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setUser(res.data)
    setLoading(false)
  }
  
  // get user repos
  const getUserRepos = async username => {
    setLoading(true)

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    setRepos(res.data)
    setLoading(false)
  }

  // clears users from state
  const clearUsers = () => setUsers([])

  const showAlert = (msg, type) => {
    setAlert({msg,type})
    setTimeout(() => setAlert(null) ,2000)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>

          <Routes>
            <Route 
              path='/' 
              element={(
              <Fragment>
                <Search searchUsers={searchUsers} setAlert={showAlert}/>
                { users.length != 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
                <Users loading={loading} users={users} />
              </Fragment>
              )}
            /> 
            <Route path='/about' element={<About/>} />
            <Route path='/user/:username' element={<User getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading}/>} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
