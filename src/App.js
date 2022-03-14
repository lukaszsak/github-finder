import React, { Fragment, Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search';
import axios from 'axios';
import { Alert } from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

  // search Github users
  searchUsers = async username => {
    this.setState({loading: true})

    const res = await axios.get(
      `https://api.github.com/search/users?q=${username}
      &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    this.setState({users:res.data.items, loading: false})
  }

  // get single Github user
  getUser = async username => {
    this.setState({loading: true})
    console.log('username ::',username)
    const res = await axios.get(
      `https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    console.log(res)
    
    this.setState({user:res.data, loading: false})
  
    
  }

  // clears users from state
  clearUsers = () => this.setState({users:[], loading: false})

  setAlert = (msg, type) => {
    this.setState({alert:{msg,type}})
    setTimeout(()=>this.setState({alert: null}),2000)
  }

  render(){
    const { users, loading, alert, user } = this.state
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
                  <Search searchUsers={this.searchUsers} setAlert={this.setAlert}/>
                  { users.length != 0 && <button className="btn btn-light btn-block" onClick={this.clearUsers}>Clear</button> }
                  <Users loading={loading} users={users} />
                </Fragment>
                )}
              /> 
              <Route path='/about' element={<About/>} />
              <Route path='/user/:login' element={<User getUser={this.getUser} user={user} loading={loading}/>} />
            </Routes>

          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
