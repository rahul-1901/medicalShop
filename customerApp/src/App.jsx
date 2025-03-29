import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import {GoogleOAuthProvider} from '@react-oauth/google';

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='301203180369-st80hs4ki8eksdk99dgno3b6h7eed8sa.apps.googleusercontent.com'>
        <Login></Login>
      </GoogleOAuthProvider>
    )
  }

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} caseSensitive></Route>
        <Route path='/login' element={<GoogleAuthWrapper/>} caseSensitive></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
