import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AddEmployee from './components/AddEmployee';
import AddInstance from './components/AddInstance';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';
import UpdateInstance from './components/UpdateInstance';

function App() {
  return (
    <>
    <BrowserRouter>
    

    <Routes>
       <Route index element={ <EmployeeList/> } />
       <Route path="/" element={ <EmployeeList/> } />
       <Route path="/addEmployee" element={ <AddEmployee/>} />
       <Route path="/addInstance" element={ <AddInstance/>} />
       <Route path="/editEmployee/:id" element={ <UpdateEmployee/>} />
       <Route path="/editInstance/:id" element={ <UpdateInstance/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
