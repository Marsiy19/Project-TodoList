import { Routes, Route } from "react-router-dom";
import Register from '../page/Register'
import Login from "../page/Login";
import NotFound from "../components/NotFound/NotFound";
import Home from "../page/Home";
import Schedule from "../components/Schedule/Schedule";
import Tasks from "../components/Tasks/Tasks";



const Routers = () => {
    return(
        <>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Schedule />} />
            <Route path="/lists/:id" element={<Tasks />} />



        </Routes>
        
        </>
    )
}

export default Routers