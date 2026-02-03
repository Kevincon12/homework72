import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import {useEffect} from "react";
import {fetchDishes} from "../../features/dishesSlice.ts";

const AdminDishes = () => {
    const navigate = useNavigate();
    const { items, loading } = useSelector((state: RootState) => state.dishes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    return (
        <div className='container p-2'>
            <header className='d-flex justify-content-between align-items-center mb-4 border-bottom pb-2'>
                <h2 className='mb-0' style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dishes')}>Ilia pizzzzza</h2>
                <div>
                    <button className='btn btn-outline-primary me-2' onClick={() => navigate('/admin/dishes')}>Dishes</button>
                    <button className='btn btn-outline-secondary' onClick={() => navigate('/admin/orders')}>Orders</button>
                </div>
            </header>

            <h1>Dishes</h1>
            <button className='btn btn-primary mb-3'>Add new dish</button>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div className='list-group'>
                {items.map(dish => (
                    <div key={dish.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <img src={dish.image} alt={dish.title} style={{ width: 100, height: 100, objectFit: 'cover', marginRight: '10px' }} />
                        <div>
                            {dish.title} — <strong>{dish.price} som</strong>
                        </div>
                        <div>
                            <button
                                className='btn btn-sm btn-secondary me-2'
                                onClick={() => navigate(`/admin/dishes/edit/${dish.id}`)}
                            >
                                Edit
                            </button>

                            <button
                                className='btn btn-sm btn-danger'
                                onClick={() => dispatch(deleteDish(dish.id))}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDishes;