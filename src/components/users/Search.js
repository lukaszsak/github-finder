import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChangeHandler = e => this.setState({[e.target.name]: e.target.value})
    
    onSubmitHandler = e => {
        e.preventDefault()
        if(this.state.text == ''){
            this.props.setAlert('Please enter something...', 'light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({text:''})
        }

    }

    render() {
        return (
        <div>
            <form className='form' onSubmit={this.onSubmitHandler}>
                <input type="text" name="text" placeholder='search users...' value={this.state.text} onChange={this.onChangeHandler}/>
                <input type="submit" value="Search"  className='btn btn-dark btn-block'/>
            </form>
        </div>
        )
    }
}

export default Search