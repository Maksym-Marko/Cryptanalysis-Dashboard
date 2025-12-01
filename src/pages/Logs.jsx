import { Link } from "react-router-dom";

function Logs() {
    return (
        <div class="min-h-screen bg-gray-100 p-6">
            <div class="mx-auto max-w-full">

                {/* Heading */}
                <h1 class="text-2xl font-semibold text-gray-800 mb-6">
                    Logs
                </h1>

                <div class="flex justify-end mb-6">
                    <Link to="/" class="text-blue-600 hover:text-blue-700">
                        Go to Orders
                    </Link>
                </div>

                {/* Table Wrapper */}
                <div class="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
                    <table class="min-w-full text-left text-sm text-gray-700">

                        {/* Table Head */}
                        <thead class="bg-gray-50 border-b text-xs uppercase text-gray-600">
                            <tr>
                                <th class="px-4 py-3">ID</th>
                                <th class="px-4 py-3">Action</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Order index</th>
                                <th class="px-4 py-3">Client Order ID</th>
                                <th class="px-4 py-3">Message</th>
                                <th class="px-4 py-3">Timestamp</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {/* Example Row */}
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">1</td>
                                <td class="px-4 py-3">order_open</td>

                                <td class="px-4 py-3 font-medium text-blue-600">
                                    success
                                </td>

                                <td class="px-4 py-3">0</td>

                                <td class="px-4 py-3">abc123xyz</td>

                                <td class="px-4 py-3 max-w-xs truncate">
                                    The order was successfully created…
                                </td>

                                <td class="px-4 py-3">1764500003000</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Logs;