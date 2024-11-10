import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';
import PassengerDetails from './PassengerDetails';
import TripDetails from './TripDetails';  // Import TripDetails
import QuotingSystem from './QuotingSystem';  // Import QuotingSystem
import BookingAssignment from './BookingAssignment';  // Import BookingAssignment
import TripExecution from './TripExecution';  // Import TripExecution
import BillingReporting from './BillingReporting';  // Import BillingReporting

const AdminDashboard = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <List>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to="/passenger-details">
              <ListItemText primary="Passenger Details" />
            </ListItemButton>
            <ListItemButton component={Link} to="/trip-details">
              <ListItemText primary="Trip Details" />
            </ListItemButton>
            <ListItemButton component={Link} to="/quoting-system">
              <ListItemText primary="Quoting System" />
            </ListItemButton>
            <ListItemButton component={Link} to="/booking-assignment">
              <ListItemText primary="Booking Assignment" />
            </ListItemButton>
            <ListItemButton component={Link} to="/trip-execution">
              <ListItemText primary="Trip Execution" />
            </ListItemButton>
            <ListItemButton component={Link} to="/billing-reporting">
              <ListItemText primary="Billing and Reporting" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Admin Dashboard</Typography>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Typography variant="h4" gutterBottom>Dashboard Home</Typography>} />
              <Route path="/passenger-details" element={<PassengerDetails />} />
              <Route path="/trip-details" element={<TripDetails />} />
              <Route path="/quoting-system" element={<QuotingSystem />} />
              <Route path="/booking-assignment" element={<BookingAssignment />} />
              <Route path="/trip-execution" element={<TripExecution />} />
              <Route path="/billing-reporting" element={<BillingReporting />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default AdminDashboard;
