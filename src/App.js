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
import GithubState from './context/github/GithubState';


const App = () => {
  
  const [repos, setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [alert,setAlert] = useState(null)
  
  
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

  const showAlert = (msg, type) => {
    setAlert({msg,type})
    setTimeout(() => setAlert(null) ,2000)
  }

  return (
    <GithubState>

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
                  <Search setAlert={showAlert}/>
                  <Users />
                </Fragment>
                )}
              /> 
              <Route path='/about' element={<About/>} />
              <Route path='/user/:username' element={<User getUserRepos={getUserRepos} repos={repos}/>} />
            </Routes>

          </div>
        </div>
      </BrowserRouter>
    </GithubState>
  );
}

export default App;
