import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const Users = ({users, loading}) => {
    if(loading){
        return <Spinner />
    } else {
        return (
        <div style={usersStyle}>
            {users.map(user => {
                return <UserItem key={user.id} user={user} />
            })}
        </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '1rem'
}

export default Users