import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginLayout from './layouts/login/Login';
import SystemLayout from './layouts/system/System';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<LoginLayout />} />
      <Route index path='/:path' element={<LoginLayout />} />

      <Route index path='/system/:path' element={<SystemLayout />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
