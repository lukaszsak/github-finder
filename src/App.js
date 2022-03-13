import React, { Component } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search';
import axios from 'axios';
import { Alert } from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
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

  // clears users from state
  clearUsers = () => this.setState({users:[], loading: false})

  setAlert = (msg, type) => {
    this.setState({alert:{msg,type}})
    setTimeout(()=>this.setState({alert: null}),2000)
  }

  render(){
    const { users, loading, alert } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Search searchUsers={this.searchUsers} setAlert={this.setAlert}/>
          { users.length != 0 && <button className="btn btn-light btn-block" onClick={this.clearUsers}>Clear</button> }
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }

}

export default App;
