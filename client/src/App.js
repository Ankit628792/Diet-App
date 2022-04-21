import { Routes, Route, useNavigate } from 'react-router-dom'
import { Dashboard, Error, Login, Register } from './components';
import { useEffect } from 'react';
import { checkAuth } from './util';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth(navigate);
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
