import './App.css';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Header from './components/Home/Header';
import Login from './components/Login/Login';
import store from './store';
import { useEffect } from 'react';
import { loadUser } from './actions/UserAction';
import Profile from './components/Home/Profile';
import UpdateProfile from './User/UpdateProfile';
import ProtectedRoute from './Route/ProtectedRoute';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/college/:id" element = {<CollegeDetails />} /> */}
        <Route exact path="/login" element = {<Login />} />
        {/* <Route exact path="/colleges/:keyword" element = {<Colleges />} />
        <Route exact path="/colleges" element = {<Colleges />} />
        <Route exact path="/college/hostels/:collegeName" element = {<CollegeHostels />} />
        <Route exact path="/college/hostels" element = {<CollegeHostels />} />
        <Route exact path="/hostel/:id" element = {<HostelDetails />} /> */}
        <Route exact path="/" element = {<Header />} />
        <Route path="/" element={<ProtectedRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/profile" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
