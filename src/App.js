import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import YourBooks from './pages/YourBooks';
import Orders from './pages/Orders';
import About from './pages/About';

function App() {
  return (
    <div className="">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/book' element={<YourBooks/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
