import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { Container, Typography, AppBar, Toolbar, Drawer, List, ListItemButton, ListItemText, Box } from '@mui/material';
import MultiStepForm from './MultiStepForm';
import TripDetails from './TripDetails';
import QuotingSystem from './QuotingSystem';
import BookingAssignment from './BookingAssignment';
import TripExecution from './TripExecution';
import BillingReporting from './BillingReporting';
import TermsOfServicePage from './TermsOfServicePage';
import Clients from './Clients';
import AddPassenger from './AddPassenger';
import ClientOnboarding from './ClientOnboarding';
import EditPassenger from './EditPassenger'; // Import the EditPassenger component

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
            <ListItemButton component={Link} to="/clients">
              <ListItemText primary="Clients" />
            </ListItemButton>
            <ListItemButton component={Link} to="/terms-of-service">
              <ListItemText primary="Terms of Service" />
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
            <ListItemButton component={Link} to="/add-passenger">
              <ListItemText primary="Add Passenger" />
            </ListItemButton>
            <ListItemButton component={Link} to="/client-onboarding">
              <ListItemText primary="Client Onboarding" />
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
              <Route path="/clients" element={<Clients />} />
              <Route path="/client-onboarding" element={<ClientOnboarding />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/trip-details" element={<TripDetails />} />
              <Route path="/quoting-system" element={<QuotingSystem />} />
              <Route path="/booking-assignment" element={<BookingAssignment />} />
              <Route path="/trip-execution" element={<TripExecution />} />
              <Route path="/billing-reporting" element={<BillingReporting />} />
              <Route path="/add-passenger" element={<AddPassenger clientId="clientId_placeholder" />} /> {/* AddPassenger Page */}
              <Route path="/clients/:clientId/edit-passenger/:passengerId" element={<EditPassenger />} /> {/* EditPassenger Page */}
            </Routes>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default AdminDashboard;
