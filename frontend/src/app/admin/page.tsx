"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const authStr = btoa(`${credentials.username}:${credentials.password}`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/admin/bookings/`, {
        headers: {
          'Authorization': `Basic ${authStr}`
        }
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      setBookings(data);
      setIsAuthenticated(true);
      // Store auth for this session in memory
      (window as any).adminAuth = authStr;
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-black text-gray-900 font-display">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the FHP Studios backend
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-fhp-blue focus:border-fhp-blue focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-fhp-blue focus:border-fhp-blue focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fhp-blue hover:bg-fhp-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fhp-blue"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 font-display">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-red-600 font-medium hover:text-red-800"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage & Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Addons</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {format(parseISO(booking.preferred_date), "MMM d, yyyy h:mm a")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                        {booking.brand_name && <div className="text-xs text-fhp-blue mt-1">{booking.brand_name}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.space_usage}</div>
                        <div className="text-sm text-gray-500">{booking.guest_size} guests</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {booking.addons ? booking.addons : "None"}
                        {booking.external_vendors && <div className="text-xs text-amber-600 mt-1">Ext Vendors: Yes</div>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
