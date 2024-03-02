/* eslint-disable react/prop-types */
import { useState } from 'react';

const RoomFilter = ({ data, setFilteredRooms }) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRooms = data.filter((room) => 
            room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
        );
        setFilteredRooms(filteredRooms);
    };
    

    const clearFilter = () => {
        setFilter("");
        setFilteredRooms(data);
    };

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];
    
    return (
        <div className="input-group mb-3">
            <span className='input-group-type' id='room-type-filter'>
                filter rooms by type
            </span>
            <select className='form-select' value={filter} onChange={handleSelectChange}>
                <option value={""}>select a room type...</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                ))}
            </select>
            <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
        </div>
    );
};

export default RoomFilter;
