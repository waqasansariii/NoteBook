import './App.css';
import {
  BrowserRouter as Router, // ❌ Remove this
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar.js';
import Alert from './components/Alert.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';
import Login from './components/Login.js';
import Singup from './components/Signup.js';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState();
  const showAlert = (message, type) => {
    setAlert({ 
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <addNote/>
      <NoteState>
        <Router>  
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Singup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>  {/* ❌ Remove this */}
      </NoteState>
    </>
  );
}

export default App;
