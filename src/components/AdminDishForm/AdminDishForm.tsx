import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addDishAsync, editDishAsync} from "../../features/dishesSlice.ts";
import { useParams } from "react-router-dom";


const AdminDishForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.dishes);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (id) {
            const dish = items.find(d => d.id === id);
            if (dish) {
                setTitle(dish.title);
                setPrice(dish.price.toString());
                setImage(dish.image);
            }
        }
    }, [id, items]);

    const formSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dishData = {
            id,
            title,
            price: Number(price),
            image
        };

        if (id) {
            dispatch(editDishAsync({ id, title, price: Number(price), image }));
        } else {
            dispatch(addDishAsync(dishData));
        }
        navigate('/admin/dishes');
    }

    return (
        <div className="container p-2">
            <header className='d-flex justify-content-between align-items-center mb-4 border-bottom pb-2'>
                <h2 className='mb-0' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dishes')}>Ilia pizzzzza</h2>
                <div>
                    <button className='btn btn-outline-primary me-2' onClick={() => navigate('/admin/dishes')}>Dishes</button>
                    <button className='btn btn-outline-secondary' onClick={() => navigate('/admin/orders')}>Orders</button>
                </div>
            </header>

            <h1>{id ? 'Edit Dish' : 'Add New Dish'}</h1>
            <form onSubmit={formSubmit}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="form-control mb-2" />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="form-control mb-2" />
                <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" className="form-control mb-2" />
                <button type="submit" className="btn btn-primary">{id ? 'Save' : 'Add'}</button>
            </form>
        </div>
    );
};

export default AdminDishForm;