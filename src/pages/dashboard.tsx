import { useEffect, useState } from "react";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]); // Default to an empty array
  const [editUser, setEditUser] = useState<Partial<User> | null>(null); // User being edited
  const [error, setError] = useState<string>(""); // Error message
  const [success, setSuccess] = useState<string>(""); // Success message

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    fetch("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data: User[]) => {
        console.log("Fetched users:", data);
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users. Please try again later.");
      });
  };

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    fetch(`/api/users?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete user");
        }
        fetchUsers();
        setSuccess("User deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete user. Please try again later.");
      });
  };

  const handleEdit = (user: User) => {
    setEditUser({ id: user._id, name: user.name, email: user.email });
  };

  const handleSaveEdit = () => {
    if (!editUser) return;
    console.log("Edit User Payload:", editUser); // Log the payload being sent
    const token = localStorage.getItem("token");
    fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(editUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update user");
        }
        fetchUsers();
        setEditUser(null);
        setSuccess("User updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update user. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="space-y-4">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-4 bg-gray-200 rounded shadow"
              >
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>

        {editUser && (
          <div className="mt-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editUser.name || ""}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              className="block w-full mb-4 p-2 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={editUser.email || ""}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              className="block w-full mb-4 p-2 border rounded"
              placeholder="Email"
            />
            <div className="space-x-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>Developed by Devansh Rai</p>
      </footer>
    </div>
  );
}
