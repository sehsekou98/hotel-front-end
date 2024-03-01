// eslint-disable-next-line no-unused-vars
import react, { useState } from 'react';
import { addRoom } from '../utilis/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: '',
    roomPrice: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [successMessage, setSuccessMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'roomPrice') {
      // Parse roomPrice to integer
      value = !isNaN(value) ? parseInt(value) : '';
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      setSuccessMessage('Successfully added new room to the database.');
      setNewRoom({ photo: null, roomType: '', roomPrice: '' });
      setImagePreview('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("Error adding new room");
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
    
  };

  return (
    <>
      <section className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
          <div className='col-md-8 col-lg-6'>
            <h2 className='mt-5 mb-2'>Add a New Room</h2>
            
            {successMessage && (
              <div className='alert alert-success fade show'>{successMessage}</div>
            )}

              {errorMessage && (
              <div className='alert alert-danger fade show'>{errorMessage}</div>
            )}


            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='roomType' className='form-label'>
                  Room Type
                </label>
                <div>
                  <RoomTypeSelector
                   handleRoomInputChange={handleRoomInputChange}
                  newRoom={newRoom}/>
                </div>
                <input
                  className='form-control'
                  id='roomType'
                  type='text'
                  name='roomType'
                  value={newRoom.roomType}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='roomPrice' className='form-label'>
                  Room Price
                </label>
                <input
                  className='form-control'
                  required
                  id='roomPrice'
                  type='number'
                  name='roomPrice'
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='photo' className='form-label'>
                  Room photo
                </label>
                <input
                  id='photo'
                  name='photo'
                  type='file'
                  className='form-control'
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt='preview'
                    style={{ maxWidth: '400px', maxHeight: '400px' }}
                    className='mb-3'
                  />
                )}
              </div>

              <div className='d-grid d-md-flex mt-2'>
                <button className='btn btn-outline-primary ml-5' type='submit'>
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;