import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192",
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173"
    }
});

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

// get all roomtypes
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/room-types");
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Room Types');
    }
}


// add room to database
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

// get all rooms from database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch(error) {
        throw new Error("Error getting rooms.")
    }
}

//  delete a specific room by its id
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }catch(error) {
        throw new Error(`Failed to delete room.${error.message}`)
    }
}


//  update the information of a specific room by its id
export async function updateRoom(roomId, roomDate) {
    const formData = new FormData();
    formData.append("roomType", roomDate.roomType);
    formData.append("roomPrice", roomDate.roomPrice);
    formData.append("photo", roomDate.photo);
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}


//  get one room's info by its id
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}


//  add a reservation for a user in a room
export async function bookRoom(roomId, booking){
    try {
        const res = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return res.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

// get booking confirmation code

export  async function getBookByConfCode(confirmationCode){
    try {
        const result = await api.get(`/bookings/comfirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)   //return the error message from server side
        }else{
            throw new Error(`Error finding booking : ${error.message}`)
        }
    }
}

// cancel  a booking by its id

export async function cancelBooking(bookingId){
    try {
        const result=await api.delete(`/bookings/booking/${bookingId}/cancel`);
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
}

// get  all available rooms for a specific date

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkoutDate=${checkOutDate}&roomType=${roomType}`);
    return result.data;
}


// registere a user
export async function registerUser(registration){
    try {
        const res = await api.post("/auth/register-user", registration)
        return res.data
    } catch (error) {
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}


//  login a user
export async function loginUser(login){
    try {
        const res = await api.post( "/auth/login" , login)
        if(res.status >= 200 && res.status < 300) {
            return res.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

// get user profile

export async function getUserProfile(userId, token) {
    const response = await api.get(`users/profile/${userId}`, {
        headers: getHeader()
    });
    return response.data;
}


// delete user by id
export async function deleteUser(userId) {
    const response = await api.delete(`/users/delete/${userId}`, {
        headers: getHeader()
    });
    return response.data;
}

// get user 

export async function getUser(userId, token) {
    const response = await api.get(`/users/${userId}`, {
        headers: getHeader()
    });
    return response.data;
}


// get booking by userId
export async function getBookingsByUserId(userId, token) {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
        headers: getHeader()
    });
    return response.data;
}
