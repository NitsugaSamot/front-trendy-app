import './userCard.css'

const UserCard = ( user ) => {
     console.log('esta es la card de usuario')
    return (
        <div className="UserConfig">
            <h1>{user.id}</h1>
            <h1>{user.name}</h1>
            <h1>{user.type}</h1>
            <h1>{user.confirmated ? "Confirmed" : "Not Confirmed"}</h1>
            <h1>{user.isDeleted ? "Deleted" : "Active"}</h1>
        </div>
    )
}

export default UserCard