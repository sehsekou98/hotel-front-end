import { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import { Col, Container, Row } from "react-bootstrap"
import RoomPaginator from '../common/RoomPaginator'
import RoomFilter from '../common/RoomFilter'
import {getAllRooms} from '../utilis/ApiFunctions'

const Room = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [roomsPrePage] = useState(5)
    const [filteredData, setFilteredData] = useState([{id: ''}])

    useEffect(() => {
        setIsLoading(true)
        getAllRooms()
        .then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        })
        .catch(err => {
            setError(err.message)
            setIsLoading(false)
    })

},  [])
if(isLoading) {
    return <div> Rooms is loading...</div>
}
if(error){
    return <div className='text-danger'>Error : {error}</div>
}

const  handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
}

const totalPages = Math.ceil(filteredData.length / roomsPrePage)

const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPrePage
    const endIndex = startIndex + roomsPrePage
    return filteredData.slice(startIndex, endIndex)
    .map((room) => <RoomCard key={room.id} room={room} />)
      
}

  return (
    <Container>
        <Row>
            <Col md={6} className='mb-3 mb-md-0'>
                <RoomFilter data={data} setFilteredData={setFilteredData} />
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-end'>
                <RoomPaginator currentPage={currentPage} totalPages={totalPages}
                onPageChange={handlePageChange}/>
            </Col>

        </Row>

      <Row>
      {renderRooms()}
      </Row>
      <Row>
        <Col md={6} className='d-flex align-items-center justify-contain-end'>
            <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange} />
        </Col>
      </Row>

    </Container>
  )
}

export default Room