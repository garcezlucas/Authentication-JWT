import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginLayout from './layouts/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<LoginLayout />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
