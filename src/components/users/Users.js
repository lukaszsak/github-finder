import { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'


const Users = () => {
    const githubContext = useContext(GithubContext)

    const { users, loading } = githubContext

    if(loading){
        return <Spinner />
    } else {
        return (
        <div style={usersStyle}>
            {users && users.map(user => {
                return <UserItem key={user.id} user={user} />
            })}
        </div>
        )
    }
}

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '1rem'
}

export default Users