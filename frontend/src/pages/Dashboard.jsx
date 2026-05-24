import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {
    const navigate = useNavigate();
    const user = useMemo(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    }, []);

    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        userId: user?.id
    });

    const fetchTasks = useCallback(async () => {
        if (!user?.id) {
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await API.get(`/tasks/${user.id}`);
            setTasks(response.data);
        } catch (fetchError) {
            console.log(fetchError);
            setError("Could not load your tasks. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createTask = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await API.post("/tasks", formData);
            await fetchTasks();
            setFormData({
                title: "",
                description: "",
                dueDate: "",
                userId: user.id
            });
        } catch (createError) {
            console.log(createError);
            setError("Task was not created. Check the details and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
        } catch (deleteError) {
            console.log(deleteError);
            setError("Task was not deleted. Please try again.");
        }
    };

    const markCompleted = async (id) => {
        try {
            await API.patch(`/tasks/${id}/complete`);
            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === id ? { ...task, status: "COMPLETED" } : task
                )
            );
        } catch (completeError) {
            console.log(completeError);
            setError("Task was not updated. Please try again.");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const stats = useMemo(() => {
        const completed = tasks.filter((task) => task.status === "COMPLETED").length;
        const pending = tasks.length - completed;
        const overdue = tasks.filter((task) => {
            if (!task.dueDate || task.status === "COMPLETED") {
                return false;
            }

            return new Date(task.dueDate) < new Date(new Date().toDateString());
        }).length;

        return { completed, pending, overdue, total: tasks.length };
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesStatus =
                statusFilter === "ALL" || task.status === statusFilter;
            const query = search.toLowerCase();
            const matchesSearch =
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query);

            return matchesStatus && matchesSearch;
        });
    }, [search, statusFilter, tasks]);

    useEffect(() => {
        document.title = "Dashboard";

        if (!user) {
            navigate("/login");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
    }, [fetchTasks, navigate, user]);

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-indigo-600">
                            Task workspace
                        </p>
                        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                            Welcome, {user.name}
                        </h1>
                        <p className="mt-1 break-all text-sm text-slate-500">
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="inline-flex items-center justify-center rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Total", stats.total, "border-slate-200"],
                        ["Pending", stats.pending, "border-amber-200"],
                        ["Completed", stats.completed, "border-emerald-200"],
                        ["Overdue", stats.overdue, "border-red-200"]
                    ].map(([label, value, borderClass]) => (
                        <div
                            key={label}
                            className={`rounded-lg border ${borderClass} bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
                        >
                            <p className="text-sm font-medium text-slate-500">{label}</p>
                            <p className="mt-2 text-3xl font-bold">{value}</p>
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <form
                        onSubmit={createTask}
                        className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-bold">Create task</h2>
                        <div className="mt-5 flex flex-col gap-4">
                            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Design homepage"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="rounded-md border border-slate-300 px-3 py-2 font-normal text-slate-950 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                />
                            </label>

                            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                                Description
                                <textarea
                                    name="description"
                                    placeholder="Add the important details"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="resize-none rounded-md border border-slate-300 px-3 py-2 font-normal text-slate-950 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                />
                            </label>

                            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                                Due date
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                    className="rounded-md border border-slate-300 px-3 py-2 font-normal text-slate-950 outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                />
                            </label>

                            <button
                                disabled={isSubmitting}
                                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                                {isSubmitting ? "Creating..." : "Create task"}
                            </button>
                        </div>
                    </form>

                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-xl font-bold">My tasks</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    {filteredTasks.length} visible of {tasks.length} total
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="search"
                                    placeholder="Search tasks"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="min-w-0 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:w-56"
                                />

                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                                >
                                    <option value="ALL">All status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-5 grid gap-4">
                            {isLoading ? (
                                <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                                    Loading tasks...
                                </div>
                            ) : filteredTasks.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
                                    <h3 className="font-bold text-slate-800">No tasks found</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Create one or adjust your search and filters.
                                    </p>
                                </div>
                            ) : (
                                filteredTasks.map((task) => {
                                    const isCompleted = task.status === "COMPLETED";
                                    const isOverdue =
                                        task.dueDate &&
                                        !isCompleted &&
                                        new Date(task.dueDate) < new Date(new Date().toDateString());

                                    return (
                                        <article
                                            key={task.id}
                                            className="rounded-lg border border-slate-200 p-4 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                                        >
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <h3 className="break-words text-lg font-bold">
                                                        {task.title}
                                                    </h3>
                                                    <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                                                        {task.description}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                                                        isCompleted
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-amber-50 text-amber-700"
                                                    }`}
                                                >
                                                    {task.status}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <p
                                                    className={`text-sm font-medium ${
                                                        isOverdue ? "text-red-600" : "text-slate-500"
                                                    }`}
                                                >
                                                    Due date: {task.dueDate}
                                                    {isOverdue ? " - overdue" : ""}
                                                </p>

                                                <div className="flex flex-col gap-2 sm:flex-row">
                                                    <button
                                                        onClick={() => markCompleted(task.id)}
                                                        disabled={isCompleted}
                                                        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
                                                    >
                                                        {isCompleted ? "Completed" : "Complete"}
                                                    </button>

                                                    <button
                                                        onClick={() => deleteTask(task.id)}
                                                        className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
