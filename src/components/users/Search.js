import { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {

    const githubContext = useContext(GithubContext)
    const { users, searchUsers, clearUsers } = githubContext

    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    const [text, setText] = useState('')
    
    const onChangeHandler = e => setText(e.target.value)
    
    const onSubmitHandler = e => {
        e.preventDefault()
        if(text === ''){
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
            { users.length !== 0 && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button> }
        </form>
    </div>
    )   
}


export default Search