import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Task Manager";
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <section className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                <div className="py-8">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                        Focused daily planning
                    </p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
                        Task Manager
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        Organize work, track deadlines, and keep every user's tasks
                        separated in a clean full stack dashboard.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            onClick={() => navigate("/register")}
                            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create account
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:text-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
                    {[
                        ["Register", "Create a personal workspace."],
                        ["Add tasks", "Capture details and due dates."],
                        ["Track status", "See pending, complete, and overdue work."],
                        ["Clean up", "Finish or delete tasks in one click."]
                    ].map(([title, description]) => (
                        <div
                            key={title}
                            className="rounded-lg border border-slate-200 p-4 transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-md"
                        >
                            <h2 className="font-bold">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
