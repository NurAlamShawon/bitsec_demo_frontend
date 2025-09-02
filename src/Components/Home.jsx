import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUser();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(results);
    }
  };

  return (
    <div className="xl:max-w-7xl p-6 rounded-xl shadow-xl mx-auto bg-white space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="flex items-center">
        <label className="input rounded-lg w-276">
          <input
            type="search"
            required
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="placeholder-gray-100"
          />
        </label>
        <button
          className="btn ml-4 text-white bg-blue-600 rounded-xl w-23 join-item"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b-1 border-gray-300 min-h-15 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/description/${user.id}`)
                  }
                >
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.phone}</td>
                  <td className="px-4 py-4">{user.company.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
