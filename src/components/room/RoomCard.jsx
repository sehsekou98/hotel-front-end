import PropTypes from 'prop-types'; 

import { Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useContext } from 'react';

const RoomCard = ({ room }) => {
    return (
        <Col key={room.id} className='mb-4' xs={12}>
            <Card>
                <Card.Body className='d-flex flex-wrap align-item-center'>
                    <div className='flex-shrrink-0 mr-3 mb-3 mb-md-0'>
                        <Link to={`/book-room/${room.id}`}>
                            <Card.Img
                                variant='top'
                                src={`data:image/png;base64, ${room.photo}`}
                                alt='Room Image'
                                style={{ width: '100%', maxWidth: "200PX", height: "auto" }} />
                        </Link>
                    </div>
                    <div className='flex-grow-1 ml-3 px-5'>
                        <Card.Title className='hotel-color'>{room.roomType}</Card.Title>
                        <Card.Title className='room-price'>{room.roomPrice}</Card.Title>
                        <Card.Text>An unforgettable stay is also essentially a perfect stay.
                            You’ll find the right comfort here for the rest you need after each day of discovery.
                            Twin beds, the comfort of air-conditioning and the wi-fi to connect you to whatever you most enjoy,
                            accompanied by coffee or a refreshing drink.
                        </Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                            Book Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

// Define PropTypes for the RoomCard component
RoomCard.propTypes = {
    room: PropTypes.shape({
        id: PropTypes.number.isRequired,
        photo: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
        roomPrice: PropTypes.number.isRequired
    }).isRequired
};

export default RoomCard;
