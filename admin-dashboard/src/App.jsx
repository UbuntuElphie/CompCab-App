import React from 'react';
import AdminDashboard from './components/AdminDashboard';
import { AdminProvider } from './AdminContext';

function App() {
  return (
    <AdminProvider>
      <div className="App">
        <AdminDashboard />
      </div>
    </AdminProvider>
  );
}

export default App;
