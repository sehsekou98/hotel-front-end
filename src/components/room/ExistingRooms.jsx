import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { deleteRoom, getAllRooms } from '../utilis/ApiFunctions';
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa'
import {Link}  from "react-router-dom";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoasing, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms(); 
    }, []);

    const fetchRooms = async () => { 
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {    
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            console.log("Filtered Rooms:", filtered); 
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);
    
    

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async(roomId) => {
        try{
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Deleted ${roomId} successfully.`)
                fetchRooms()
            }else{
                console.error(`Error deleting room : ${result.message}`)
        }
    }catch(err){
        setErrorMessage(err.message)
    }
    setTimeout(() => {
        setSuccessMessage('')
        setErrorMessage("")
    }, 3000)

}

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    return (
        <>
            {isLoasing ? (
                <p>Loading Rooms</p>
            ) : (
                <>
                    <section className='mt-5 mb-5 container'>
                        <div className='d-flex justify-content-center mb-3 mt-5'>
                            <h2>Avaliable Rooms</h2>
                        </div>
                        <Col md={6} className="mb-3 mb-0">
                            <RoomFilter data={rooms} setFilteredRooms={setFilteredRooms} />
                        </Col>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>ID</th>
                                    <th>ROOM Type</th>
                                    <th>Room Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms.map((room) => (
                                    <tr key={room.id} className='text-center'>
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>${room.roomPrice} per night</td>
                                        <td className='gap-2'>
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className='btn btn-info btn-sm'>
                                                    <FaEye/>
                                                </span>
                                                <span className='btn btn-warning btn-sm'> {/* Corrected class name: btn-warning */}

                                                    <FaEdit/>
                                                </span>
                                                </Link>
                                            <button 
                                            className='btn btn-danger btn-sm'
                                            onClick={() => handleDelete(room.id)}>
                                                <FaTrashAlt/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)} 
                            onPageChange={handlePaginationClick} />
                    </section>
                </>
            )}
        </>
    );
};




export default ExistingRooms;
