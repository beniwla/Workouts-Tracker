import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.jsx';

// pages & components 
import Home from './pages/Home.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

// Navbar component inside Browser Router because Link works inside only
function App() {

  const { user }= useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home/> : <Navigate to="/login"/>}
            />
          </Routes>

          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login/> : <Navigate to="/"/> }
            />
          </Routes>

          <Routes>
            <Route 
              path="/signup" 
              element={!user ? <Signup/> : <Navigate to="/"/> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
