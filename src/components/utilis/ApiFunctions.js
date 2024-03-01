// ApiFunctions.js

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
});

// Fetch room types from the API
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types");
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
