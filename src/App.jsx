import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Home from './components/home/Home.jsx';
import EditRoom from './components/room/EditRoom.jsx'
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from './components/room/ExistingRooms.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
  <>
  <main>
    <Router>
      <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/edit-room/:roomId" element={<EditRoom />}/>
       <Route path="/existing-room/" element={<ExistingRooms />}/>
       <Route path="/add-room/:roomId" element={<AddRoom />}/>
      </Routes>
    </Router> 
    </main> 
    </>

  )
  
}

export default App;
