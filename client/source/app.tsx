import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Pages
import LoginPage from './login.tsx'
import SignupPage from './Signup.tsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



