import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {fetchDishes} from "../../features/dishesSlice.ts";

interface OrderItem {
    dishId: string;
    title: string;
    price: number;
    quantity: number;
}

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading} = useSelector((state: RootState) => state.dishes);

    const [order, setOrder] = useState<OrderItem[]>([]);

    const [showModal, setShowModal] = useState(false);

    const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const addToOrder = (dish: {id: string; title: string; price: number}) => {
        setOrder(prev => {
            const existing = prev.find(item => item.dishId === dish.id);
            if (existing) {
                return prev.map(item =>
                    item.dishId === dish.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { dishId: dish.id, title: dish.title, price: dish.price, quantity: 1 }];
            }
        });
    };

    const buildOrderPayload = (order: OrderItem[]): Record<string, number> => {
        const payload: Record<string, number> = {};
        for (const i in order) {
            const item = order[i];
            payload[item.dishId] = item.quantity;
        }
        return payload;
    };

    const sendOrder = () => {
        const payload = buildOrderPayload(order);
        console.log(payload);

        setOrder([]);
        setShowModal(false);
    };

    return (
        <div className='container p-2'>
            <header className='d-flex justify-content-between align-items-center mb-4 border-bottom pb-2'>
                <h2 className='mb-0' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Ilia pizzzzza</h2>
            </header>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div className='list-group'>
                {items.map(dish => (
                    <div
                        key={dish.id}
                        className='list-group-item d-flex justify-content-between align-items-center'
                        onClick={() => addToOrder(dish)}
                    >
                        <img src={dish.image} alt={dish.title} style={{ width: 100, height: 100, objectFit: 'cover', marginRight: '10px' }} />
                        <div>
                            {dish.title} — <strong>{dish.price} som</strong>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Your Order</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {order.map(item => (
                                    <div key={item.dishId} className="d-flex justify-content-between">
                                        <span>{item.title} x {item.quantity}</span>
                                        <span>{item.price * item.quantity} som</span>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <strong>Total:</strong>
                                    <strong>{total} som</strong>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={sendOrder}>Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>Order total <strong>{total}som</strong></div>
            <button
                className='btn btn-primary text-center mt-2'
                onClick={() => setShowModal(true)}
            >Checkout</button>
        </div>
    );
};

export default Home;