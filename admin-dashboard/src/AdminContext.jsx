import React, { createContext, useContext, useState } from 'react';

// Create a context for the admin
const AdminContext = createContext();

// Custom hook to use the admin context
export const useAdmin = () => useContext(AdminContext);

// AdminProvider component to wrap around the parts of the app that need admin context
export const AdminProvider = ({ children }) => {
  // State to track if the user is an admin
  const [isAdmin, setIsAdmin] = useState(true); // Set to true to simulate admin status

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
