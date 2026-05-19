import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        userId: user.id
    });

    const fetchTasks = async () => {

        try {

            const response = await API.get(
                `/tasks/${user.id}`
            );

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createTask = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/tasks",
                formData
            );

            fetchTasks();

            setFormData({
                title: "",
                description: "",
                dueDate: "",
                userId: user.id
            });

        } catch (error) {

            console.log(error);
        }
    };

    const deleteTask = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const markCompleted = async (id) => {

        try {

            await API.patch(
                `/tasks/${id}/complete`
            );

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/login");
    };

    useEffect(() => {
        document.title = "Dashboard";
        fetchTasks();

    }, []);

    return (
        
        <div className="p-10">

            <div className="flex justify-between items-center mb-6">

            <div>

                <h1 className="text-3xl mb-2">
                    Welcome, {user.name}
                </h1>

                <p className="text-gray-600">
                    {user.email}
                </p>

            </div>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>

        </div>


            <h2 className="text-2xl mb-2" >Register a New Task</h2>
            <form
                onSubmit={createTask}
                className="flex flex-col gap-4 w-96 mb-10"
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="border p-2"
                />

                <button
                    className="bg-black text-white p-2"
                >
                    Create Task
                </button>

            </form>
            <h1 className="text-2xl mb-2" > My tasks </h1>
            <div className="flex flex-col gap-4">

                {tasks.map((task) => (

                    <div
                        key={task.id}
                        className="border p-4 rounded"
                    >

                        <h2 className="text-xl font-bold">
                            {task.title}
                        </h2>

                        <p className="mt-2">
                            {task.description}
                        </p>

                        <p
                            className={
                                task.status === "COMPLETED"
                                    ? "text-green-600 font-bold mt-2"
                                    : "text-yellow-600 font-bold mt-2"
                            }
                        >
                            Status: {task.status}
                        </p>

                        <p className="mt-2">
                            Due Date: {task.dueDate}
                        </p>

                        <div className="flex gap-3 mt-4">

                            <button
                                onClick={() => markCompleted(task.id)}
                                className="bg-green-500 text-white px-4 py-2"
                            >
                                Complete
                            </button>

                            <button
                                onClick={() => deleteTask(task.id)}
                                className="bg-red-500 text-white px-4 py-2"
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Dashboard;