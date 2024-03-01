// RoomTypeSelector.jsx

import  { useEffect, useState } from 'react';
import { getRoomTypes } from '../utilis/ApiFunctions';

// eslint-disable-next-line react/prop-types
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
                console.error('Error fetching room types:', error);
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
                        // eslint-disable-next-line react/prop-types
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

export default RoomTypeSelector;
