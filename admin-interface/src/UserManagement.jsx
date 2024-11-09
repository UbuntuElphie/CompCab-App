import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { name: 'John Doe', role: 'Driver', contact: '123-456-7890' },
        { name: 'Jane Smith', role: 'Passenger', contact: '987-654-3210' }
    ]);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const removeUser = (index) => {
        const newUsers = users.slice();
        newUsers.splice(index, 1);
        setUsers(newUsers);
    };

    return (
        <div>
            <h2>User Management</h2>
            <button onClick={() => addUser({ name: 'New User', role: 'Driver', contact: '000-000-0000' })}>Add User</button>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name} - {user.role} - {user.contact}
                        <button onClick={() => removeUser(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
