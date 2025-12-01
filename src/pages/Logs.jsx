import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Logs() {
    const [logs, setLogs] = useState([]);

    const loadLogs = () => {
        axios.get("http://localhost:3001/logs")
            .then(res => setLogs(res.data))
            .catch(err => console.error("Failed to load logs:", err));
    };

    useEffect(() => {
        loadLogs();

        // connect to WebSocket
        const ws = new WebSocket("ws://localhost:3002");

        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.type === "logs_updated") {

                console.log("Logs updated");
                loadLogs(); // refresh table
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-full">

                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Logs
                </h1>

                <div className="flex justify-end mb-6">
                    <Link to="/" className="text-blue-600 hover:text-blue-700">
                        Go to Orders
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
                    <table className="min-w-full text-left text-sm text-gray-700">

                        <thead className="bg-gray-50 border-b text-xs uppercase text-gray-600">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Action</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Order Index</th>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Client Order ID</th>
                                <th className="px-4 py-3">Message</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{log.id}</td>
                                    <td className="px-4 py-3">{log.action}</td>

                                    {/* Colored status */}
                                    <td
                                        className={`px-4 py-3 font-medium ${log.status === "success" ? "text-green-600" :
                                                log.status === "error" ? "text-red-600" :
                                                    log.status === "warning" ? "text-yellow-600" :
                                                        "text-gray-500"
                                            }`}
                                    >
                                        {log.status}
                                    </td>

                                    <td className="px-4 py-3">{log.order_index}</td>
                                    <td className="px-4 py-3">{log.order_id}</td>
                                    <td className="px-4 py-3">{log.clientOrderId}</td>

                                    {/* Message truncation */}
                                    <td className="px-4 py-3 max-w-xs truncate">
                                        {log.message}
                                    </td>

                                    <td className="px-4 py-3">
                                        {new Date(log.timestamp * 1000).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default Logs;
