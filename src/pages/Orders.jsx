import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        axios.get("http://localhost:3001/orders")
            .then(res => setOrders(res.data));
    };

    useEffect(() => {
        loadOrders();

        // connect to WebSocket
        const ws = new WebSocket("ws://localhost:3002");

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type === "orders_updated") {

                console.log("Orders updated");
                loadOrders(); // refresh table
            }
        };

        return () => ws.close();
    }, []);

    console.log(orders)

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-full">

                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Orders
                </h1>

                <div className="flex justify-end mb-6">
                    <Link to="/logs" className="text-blue-600 hover:text-blue-700">Go to Logs</Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
                    <table className="min-w-full text-left text-sm text-gray-700">

                        <thead className="bg-gray-50 border-b text-xs uppercase text-gray-600">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Symbol</th>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Side</th>
                                <th className="px-4 py-3">Lev.</th>
                                <th className="px-4 py-3">Am. USDT</th>
                                <th className="px-4 py-3">Open time</th>
                                <th className="px-4 py-3">Open price</th>
                                <th className="px-4 py-3">AI prediction</th>
                                <th className="px-4 py-3">Latest update time</th>
                                <th className="px-4 py-3">Latest price</th>
                                <th className="px-4 py-3">TLSL %</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Close reason</th>
                                <th className="px-4 py-3">Close price</th>
                                <th className="px-4 py-3">PNL usdt</th>
                                <th className="px-4 py-3">PNL %</th>
                                <th className="px-4 py-3">Note</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">{order.symbol}</td>
                                    <td className="px-4 py-3">{order.order_id}</td>
                                    <td className="px-4 py-3">{order.side}</td>
                                    <td className="px-4 py-3">{order.leverage}</td>
                                    <td className="px-4 py-3">{order.amount_usdt}</td>
                                    <td className="px-4 py-3">{order.open_time}</td>
                                    <td className="px-4 py-3">{order.open_price}</td>
                                    <td className="px-4 py-3">{order.ai_prediction}</td>
                                    <td className="px-4 py-3">{order.latest_update_time}</td>
                                    <td className="px-4 py-3">{order.latest_price}</td>
                                    <td className="px-4 py-3">{order.tlsl}</td>
                                    <td className="px-4 py-3">{order.status}</td>
                                    <td className="px-4 py-3">{order.close_reason}</td>
                                    <td className="px-4 py-3">{order.close_price}</td>
                                    <td className={`px-4 py-3 ${order.pnl_usdt > 0
                                            ? 'text-green-600'
                                            : order.pnl_usdt < 0
                                                ? 'text-red-600'
                                                : ''
                                        }`}>
                                        {order.pnl_usdt}
                                    </td>
                                    <td className={`px-4 py-3 ${order.pnl_percent > 0
                                            ? 'text-green-600'
                                            : order.pnl_percent < 0
                                                ? 'text-red-600'
                                                : ''
                                        }`}>
                                        {order.pnl_percent}
                                    </td>
                                    <td className="px-4 py-3">{order.note}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;
