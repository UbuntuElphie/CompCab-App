import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditClient from './EditClient';
import AddPassenger from './AddPassenger';
import ViewDetails from './ViewDetails';
import EditPassenger from './EditPassenger'; // Import the EditPassenger component
import './Clients.css'; // Import the CSS file

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showAddPassenger, setShowAddPassenger] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null); // State for the selected passenger
  const [showEditPassenger, setShowEditPassenger] = useState(false); // State to show EditPassenger form
  const navigate = useNavigate();

  const fetchClients = async () => {
    const clientsRef = collection(db, 'accountHolders');
    const clientsSnapshot = await getDocs(clientsRef);
    const clientsList = clientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setClients(clientsList);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEditClientOpen = (client) => {
    setSelectedClient(client);
    setShowEditClient(true);
  };

  const handleAddPassengerOpen = (client) => {
    setSelectedClient(client);
    setShowAddPassenger(true);
  };

  const handleViewDetailsOpen = (details) => {
    setSelectedDetails(details);
    setShowViewDetails(true);
  };

  const handleEditPassengerOpen = (client, passenger) => {
    // Check if passenger id is defined and navigate to the correct route
    if (passenger.id) {
      navigate(`/clients/${client.id}/edit-passenger/${passenger.id}`);
    } else {
      console.error("Passenger ID is undefined");
    }
  };

  const handleDeactivate = async (clientId, passengerIndex) => {
    const clientRef = doc(db, 'accountHolders', clientId);
    const clientDoc = await getDoc(clientRef);
    if (clientDoc.exists()) {
      const clientData = clientDoc.data();
      clientData.passengers[passengerIndex].isActive = false;
      await updateDoc(clientRef, { passengers: clientData.passengers });
      fetchClients(); // Refresh client list
    }
  };

  const handleBack = () => {
    setShowEditClient(false);
    setShowAddPassenger(false);
    setShowViewDetails(false);
    setShowEditPassenger(false);
    setSelectedClient(null);
    setSelectedDetails(null);
    setSelectedPassenger(null);
    fetchClients(); // Refresh client list after closing
  };
  return (
    <Box className="container">
      <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
        Clients
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate('/client-onboarding')} >
        Add New Client
      </Button>
      {showEditClient && selectedClient ? (
        <Box>
          <IconButton onClick={handleBack}>
            <Typography>Back</Typography>
          </IconButton>
          <EditClient clientId={selectedClient.id} />
        </Box>
      ) : showAddPassenger && selectedClient ? (
        <Box>
          <IconButton onClick={handleBack}>
            <Typography>Back</Typography>
          </IconButton>
          <AddPassenger clientId={selectedClient.id} />
        </Box>
      ) : showViewDetails && selectedDetails ? (
        <Box>
          <IconButton onClick={handleBack}>
            <Typography>Back</Typography>
          </IconButton>
          <ViewDetails details={selectedDetails} />
        </Box>
      ) : showEditPassenger && selectedClient && selectedPassenger ? (
        <Box>
          <IconButton onClick={handleBack}>
            <Typography>Back</Typography>
          </IconButton>
          <EditPassenger clientId={selectedClient.id} passengerId={selectedPassenger.id} />
        </Box>
      ) : (
        <List>
          {clients.map((client) => (
            <div key={client.id}>
              <ListItem className="client-list-item">
                <ListItemText
                  primary={client.firstName + ' ' + client.lastName}
                  secondary={`ID: ${client.clientId}`}
                  className="client-list-item-text"
                  style={{ color: 'black' }}
                />
                <div className="client-list-item-icons">
                  <IconButton edge="end" aria-label="info" onClick={() => handleViewDetailsOpen(client)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="add" onClick={() => handleAddPassengerOpen(client)}>
                    <PersonAddIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditClientOpen(client)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(client.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
              {/* Displaying passengers */}
              {client.passengers && client.passengers.filter(p => p.isActive !== false).length > 0 && (
                <List>
                  {client.passengers.filter(p => p.isActive !== false).map((passenger, index) => (
                    <ListItem key={index} className="passenger-list-item">
                      <ListItemText
                        primary={`${passenger.firstName} ${passenger.lastName}`}
                        secondary={`Contact: ${passenger.contactNumber}, Gender: ${passenger.gender}`}
                        className="passenger-list-item-text"
                        style={{ color: 'black' }}
                      />
                      <div className="passenger-list-item-icons">
                        <IconButton edge="end" aria-label="info" onClick={() => handleViewDetailsOpen(passenger)}>
                          <InfoIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditPassengerOpen(client, passenger)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="deactivate" onClick={() => handleDeactivate(client.id, index)}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Clients;
