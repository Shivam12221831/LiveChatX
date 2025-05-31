import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<Chatpage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
