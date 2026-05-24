import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        document.title = "Login";
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await API.post("/auth/login", formData);
            localStorage.setItem("user", JSON.stringify(response.data));
            setFormData({
                email: "",
                password: ""
            });
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setMessage("Login failed. Please check your email and password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 w-fit rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Home
                </button>

                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h1 className="text-3xl font-black">Login</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Continue to your personal task dashboard.
                    </p>

                    {message && (
                        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rounded-md border border-slate-300 px-3 py-2 font-normal outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                            Password
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="rounded-md border border-slate-300 px-3 py-2 font-normal outline-none transition hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />
                        </label>

                        <button
                            disabled={isSubmitting}
                            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {isSubmitting ? "Signing in..." : "Login"}
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default Login;
