import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(false); // 👈 Full page loading state

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
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowClick = (id) => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = `/description/${id}`;
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Full page loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <motion.div
            className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Main content */}
      <div className="xl:max-w-7xl p-6 rounded-xl shadow-xl mx-auto bg-white space-y-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="xl:flex flex-row items-center">
          <label className="input rounded-lg xl:w-276 w-full">
            <input
              type="search"
              required
              placeholder="Search by Name or Email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="placeholder-gray-100 "
            />
          </label>
          <button
            className="btn xl:ml-4 xl:mt-0 mt-1 text-white bg-blue-600 rounded-xl xl:w-23 w-full join-item"
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
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b-1 border-gray-300 min-h-15 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(user.id)}
                     data-aos="fade-left" data-aos-delay="100" data-aos-anchor=".example-selector"
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

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="text-sm bg-gray-300 p-2 rounded-lg"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of{" "}
            {Math.ceil(filteredUsers.length / usersPerPage)}
          </span>
          <button
            className="text-sm bg-gray-300 p-2 rounded-lg"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(filteredUsers.length / usersPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
