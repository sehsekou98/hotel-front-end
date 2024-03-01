// RoomTypeSelector.jsx

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRoomTypes } from '../utilis/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    useEffect(() => {
        async function fetchRoomTypes() {
            try {
                const data = await getRoomTypes();
                setRoomTypes(data);
            } catch (error) {
                console.error('Error fetching room types:', error.message)
            }
        }
        fetchRoomTypes();
    }, []);
    

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    };

    const handleAddNewRoomType = () => {
        if (newRoomType.trim() !== "") {
            setRoomTypes([...roomTypes, newRoomType.trim()]);
            setNewRoomType("");
            setShowNewRoomTypeInput(false);
        }
    };

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        id='roomType'
                        name='roomType'
                        value={newRoom.roomType}
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewRoomTypeInput(true);
                            } else {
                                handleRoomInputChange(e);
                            }
                        }}>
                        <option value={""}>Select a room type</option>
                        <option value={"Add New"}>Add New</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>

                    {showNewRoomTypeInput && (
    <div className='input-group'>
        <input
            className='form-control'
            type='text'
            placeholder='Enter a new room type'
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
        />
        <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
            Add
        </button>
    </div>
)}

                </div>
            )}
        </>
    );
};

RoomTypeSelector.propTypes = {
    handleRoomInputChange: PropTypes.func.isRequired,
    newRoom: PropTypes.shape({
        roomType: PropTypes.string.isRequired
    }).isRequired
};

export default RoomTypeSelector;
