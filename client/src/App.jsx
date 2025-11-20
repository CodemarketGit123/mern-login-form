import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Dashborad from "./Component/Dashborad";
import { useState } from 'react';
import RefreshHandler from "./Component/RefreshHandler";


function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashborad />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
