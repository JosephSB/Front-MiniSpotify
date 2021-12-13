import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Aside from '../Components/Layouts/Aside';
import Reproductor from '../Components/Layouts/Reproductor';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Home from "../Pages/Home";
import Upload from '../Pages/Upload/Upload';
import Usuario from '../Pages/Usuario/Usuario';

const MainRouter = () =>{
    return (
        <Router>
            <Aside/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/Login" element={<Login/>}></Route>
                <Route exact path="/Register" element={<Register/>}></Route>
                <Route exact path="/Usuario/:id" element={<Usuario/>}></Route>
                <Route exact path="/Upload" element={<Upload/>}></Route>
            </Routes>
            <Reproductor />
        </Router>
    )
}

export default MainRouter