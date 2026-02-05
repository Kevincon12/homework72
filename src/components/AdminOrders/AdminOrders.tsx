import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {useEffect} from "react";
import {deleteOrderAsync, getOrdersAsync} from "../../features/ordersSlice.ts";

const AdminOrders = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { items: orders, loading } = useSelector((state: RootState) => state.orders);
    const { items: dishes } = useSelector((state: RootState) => state.dishes);

    const dishesMap = dishes.reduce((acc, dish) => {
        acc[dish.id] = dish;
        return acc;
    }, {} as Record<string, typeof dishes[number]>);

    useEffect(() => {
        dispatch(getOrdersAsync());
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

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <ul className="list-group">
                {orders.map(order => (
                    <li key={order.id} className="list-group-item mb-3">
                        <div className="fw-bold mb-2">Order #{order.id}</div>

                        <ul className="list-group">
                            {Object.entries(order.items).map(([dishId, count]) => {
                                const dish = dishesMap[dishId];

                                return (
                                    <li key={dishId} className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <strong>{dish?.title ?? 'Unknown dish'}</strong>
                                            <div className="text-muted">
                                                {count} × {dish?.price ?? 0} som
                                            </div>
                                        </div>
                                        <div>{(dish?.price ?? 0) * count} som</div>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            className="btn btn-success mt-3"
                            onClick={() => dispatch(deleteOrderAsync(order.id))}
                        >
                            Complete order
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminOrders;