import { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({setAlert, searchUsers}) => {

    const [text, setText] = useState('')
    
    const onChangeHandler = e => setText(e.target.value)
    
    const onSubmitHandler = e => {
        e.preventDefault()
        if(text == ''){
            setAlert('Please enter something...', 'light')
        } else {
            searchUsers(text)
            setText('')
        }
    }

    return (
    <div>
        <form className='form' onSubmit={onSubmitHandler}>
            <input type="text" name="text" placeholder='search users...' value={text} onChange={onChangeHandler}/>
            <input type="submit" value="Search"  className='btn btn-dark btn-block'/>
        </form>
    </div>
    )   
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search