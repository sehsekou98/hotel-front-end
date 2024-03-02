import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './components/home/Home.jsx';
import EditRoom from './components/room/EditRoom.jsx'
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from './components/room/ExistingRooms.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/layout/Footer"
import Navbar from './components/layout/Navbar.jsx';


function App() {
  return (
  <>
  <main>
    <Router>
      <Navbar/>
      <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/edit-room/:roomId" element={<EditRoom />}/>
       <Route path="/existing-rooms/" element={<ExistingRooms />}/>
       <Route path="/add-room" element={<AddRoom />} />
      </Routes>
    </Router>
     <Footer />
    </main> 
    </>

  )
  
}

export default App;
