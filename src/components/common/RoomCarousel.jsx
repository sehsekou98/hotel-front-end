import  { useEffect, useState } from "react";
import  getAllRoom  from "../utilis/ApiFunctions";
import { Link } from 'react-router-dom';
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllRoom()
            .then((data) => {
                setRooms(data);
                setLoading(false);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="mt-5">Loading rooms....</div>;
    }

    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>;
    }

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Browse all Rooms
            </Link>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={`item${index}`}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${room.photo}`}
                                                    alt="Room Photo"
                                                    className="w-100"
                                                    style={{ height: "200px" }}
                                                />
                                                <Card.Body>
                                                    <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                                                    <Card.Title className="room-price">${room.roomPrice}/night</Card.Title>
                                                    <div className="flex-shrink-0">
                                                        <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                                                            Book Now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
