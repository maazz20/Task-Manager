import { useEffect, useState } from "react";
import API from "../services/api";

function Register() {

    useEffect(() => {

        document.title = "Register";

    }, []);

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/register",
                formData
            );

            alert("User Registered");

            setFormData({
                name: "",
                email: "",
                password: ""
            });
            console.log(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="p-10">

            <h1 className="text-3xl mb-5">
                Register
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-96"
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border p-2"
                />

                <button
                    className="bg-black text-white p-2"
                >
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;