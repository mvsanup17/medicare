import React, { useEffect, useState } from 'react';
import "./admin.css";
import Titlebar from '../navbar/titlebar.jsx';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch registered users from backend API
    fetch('http://localhost:5000/api/users') // Update with your actual API endpoint
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className='admin-bg'>
      <Titlebar/>
      <br /><br />
      <div className="container mt-4">
        <h2 className="text-center mb-4 admin-text">Registered Users</h2>
        <br />
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-success">
              <tr>
                <th><b>S.NO.</b></th>
                <th><b>Name</b></th>
                <th><b>Email</b></th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-danger">No registered users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
