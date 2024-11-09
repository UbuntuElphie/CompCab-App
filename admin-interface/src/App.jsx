import { useState, useEffect } from 'react';
import './App.css';
import AdminDashboard from './AdminDashboard';
import './AdminDashboard'
import { addTrip, getTrips, updateTrip, deleteTrip } from './firestoreOperations'; // Ensure the path is correct

function App() {
  const [count, setCount] = useState(0);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      const tripsData = await getTrips();
      setTrips(tripsData);
    }
    fetchTrips();
  }, []);

  const handleAddTrip = async () => {
    const tripData = {
      accountHolderId: "acc123",
      passengerId: "passenger123",
      driverId: "driver123",
      pickupLocation: "Location A",
      dropoffLocation: "Location B",
      pickupTime: "2023-04-06T10:00:00Z",
      dropoffTime: "2023-04-06T10:30:00Z",
      status: "completed",
      fare: 50.00
    };
    await addTrip(tripData); // Don't specify tripId, let Firestore generate it
    const tripsData = await getTrips();
    setTrips(tripsData); // Refresh trips list after adding
  };

  const handleUpdateTrip = async (tripId) => {
    const updatedData = {
      status: "ongoing",
      fare: 55.00
    };
    await updateTrip(tripId, updatedData);
    const tripsData = await getTrips();
    setTrips(tripsData); // Refresh trips list after updating
  };

  const handleDeleteTrip = async (tripId) => {
    await deleteTrip(tripId);
    const tripsData = await getTrips();
    setTrips(tripsData); // Refresh trips list after deleting
  };

  return (
    <>
      <AdminDashboard />
      <div>
        <h1>CompCab Admin Interface</h1>
        <button onClick={handleAddTrip}>Add Trip</button>
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              {trip.pickupLocation} to {trip.dropoffLocation} ({trip.status})
              <button onClick={() => handleUpdateTrip(trip.id)}>Edit</button>
              <button onClick={() => handleDeleteTrip(trip.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
