// src/firestoreOperations.js

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase"; // Use correct casing

// Function to add a trip
async function addTrip(tripData) {
  try {
    const docRef = await addDoc(collection(db, "trips"), tripData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to get trips
async function getTrips() {
  const querySnapshot = await getDocs(collection(db, "trips"));
  const trips = [];
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...doc.data() });
  });
  return trips;
}

// Function to update a trip
async function updateTrip(tripId, updatedData) {
  const tripRef = doc(db, "trips", tripId); // Ensure correct reference
  try {
    await updateDoc(tripRef, updatedData);
    console.log("Document updated successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

// Function to delete a trip
async function deleteTrip(tripId) {
  const tripRef = doc(db, "trips", tripId); // Ensure correct reference
  try {
    await deleteDoc(tripRef);
    console.log("Document deleted successfully!");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

export { addTrip, getTrips, updateTrip, deleteTrip };
