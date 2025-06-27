import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import PostDetails from './components/PostDetails';

const App = () => {
  return (
    <div className="w-75 m-auto" >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/post/:id' element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;