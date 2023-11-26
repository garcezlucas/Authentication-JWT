import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginLayout from './layouts/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<LoginLayout />} />
      <Route index path='/:path' element={<LoginLayout />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
