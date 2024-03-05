import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to the Admin Panel.</h2>
      <hr/>
      <Link to={"/rxisting-rooms"}>Manage Rooms</Link> <br/>
      <Link to={"/existing-bookings"}>Manage Bookings</Link>
    </section>
  )
}

export default Admin