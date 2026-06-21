export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Businesses</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Users</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Enquiries</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500">Pending Listings</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>
        </div>
    );
}