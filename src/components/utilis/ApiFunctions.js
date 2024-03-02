// ApiFunctions.js

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173"
    }
});


// Fetch room types from the API
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/room-types");
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Room Types');
    }
}

// Add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
        return response.status === 200;
    } catch (error) {
        console.error('Error adding new room:', error);
        return false;
    }
}
//get all rooms
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    }catch(error){
  throw new Error("Error getting rooms.")
    }
}

// delete a room by Id

export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }catch(error) {
        throw new Error(`Failed to delete room.${error.message}`)
    }
}

// update the room

export async function updateRoom(roomId, roomDate) {
    const formData = new FormData();
    formData.append("roomType", roomDate.roomType);
    formData.append("roomPrice", roomDate.roomPrice);
    formData.append("photo", roomDate.photo);
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}


//  get a room by id

export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
        
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}
