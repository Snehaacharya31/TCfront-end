import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Customer Login Details</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUsers;