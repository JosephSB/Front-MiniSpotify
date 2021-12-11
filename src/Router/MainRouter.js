import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Aside from '../Components/Layouts/Aside';
import Reproductor from '../Components/Layouts/Reproductor';
import Home from "../Pages/Home";

const MainRouter = () =>{
    return (
        <Router>
            <Aside/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
            </Routes>
            <Reproductor />
        </Router>
    )
}

export default MainRouter