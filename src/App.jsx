import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import AddRoom from './components/room/AddRoom.jsx'
import ExistingRooms from './components/room/ExistingRooms.jsx';


function App() {
  return <>
      <AddRoom/>
      <ExistingRooms/>  
    </>
  
}

export default App;
