import './App.css'
import {Route, Routes, Navigate} from "react-router-dom";
import AdminDishes from "./components/AdminDishes/AdminDishes.tsx";

const App = () => (
    <>
        <Routes>
            <Route path="/admin" element={<Navigate to="/admin/dishes" />} />
            <Route path="/admin/dishes" element={<AdminDishes />} />
        </Routes>
    </>
);

export default App
