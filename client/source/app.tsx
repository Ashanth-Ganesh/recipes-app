import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Pages
import LoginPage from './login.tsx';
import SignupPage from './Signup.tsx';
import AppPage from './AppPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<AppPage />} />
      
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;



