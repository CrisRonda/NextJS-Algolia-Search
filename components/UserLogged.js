const UserLogged = ({ user, logout }) => {
  return (
    <div>
      <p>You're signed in. Email: {user.email}</p>
      <p
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={logout}
      >
        Log out
      </p>
    </div>
  );
};
export default UserLogged;
