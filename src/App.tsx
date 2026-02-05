import './App.css'
import {Route, Routes, Navigate} from "react-router-dom";
import AdminDishes from "./components/AdminDishes/AdminDishes.tsx";
import AdminDishForm from "./components/AdminDishForm/AdminDishForm.tsx";
import Home from "./components/Home/Home.tsx";
import AdminOrders from "./components/AdminOrders/AdminOrders.tsx";

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Navigate to="/admin/dishes" />} />
            <Route path="/admin/dishes" element={<AdminDishes />} />
            <Route path="/admin/dishes/new" element={<AdminDishForm />} />
            <Route path="/admin/dishes/edit/:id" element={<AdminDishForm />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
    </>
);

export default App
