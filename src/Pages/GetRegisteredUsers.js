
export const GetRegisteredUsers = ({users}) => {
  return (
    <div className={"registered-users-container"}>
        { users.map((user) => {
            return (
                <>
                <h4 className="user-name" key={user.id}> {user.name}</h4>
                </>
            )})}
    </div>
  )
}
