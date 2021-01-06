const Users = ({ users = [] }) => {
  return (
    <>
      <strong>Users</strong>;
      {users.map(({ email }, k) => (
        <div key={k}>
          <p>{email}</p>
        </div>
      ))}
    </>
  );
};
export default Users;
