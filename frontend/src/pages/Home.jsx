import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {

        document.title = "Task Manager";

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">

            <div className="bg-white shadow-lg rounded-xl p-10 max-w-2xl w-full">

                <h1 className="text-5xl font-bold text-center mb-6">
                    Task Manager
                </h1>

                <p className="text-gray-600 text-center text-lg mb-8">
                    Organize your daily tasks, manage deadlines,
                    and boost your productivity with our simple
                    full stack task management application.
                </p>

                <div className="mb-8">

                    <h2 className="text-2xl font-semibold mb-4">
                        Features
                    </h2>

                    <ul className="list-disc list-inside text-gray-700 flex flex-col gap-2">

                        <li>User Registration & Login</li>

                        <li>Create and Manage Tasks</li>

                        <li>Mark Tasks as Completed</li>

                        <li>Delete Tasks</li>

                        <li>Track Due Dates</li>

                        <li>User-Specific Dashboard</li>

                    </ul>

                </div>

                <div className="flex gap-4 justify-center">

                    <button
                        onClick={() => navigate("/register")}
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                    >
                        Register
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Home;