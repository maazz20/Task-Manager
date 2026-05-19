import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    useEffect(() => {

        document.title = "Login";

    }, []);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            alert(response.data.message);

            setFormData({
                email: "",
                password: ""
            });

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="p-10">

            <button
                onClick={() => navigate("/")}
                className="mb-5 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
                Home
            </button>

            <h1 className="text-3xl mb-5">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-96"
            >

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2"
                />

                <button
                    className="bg-black text-white p-2"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;