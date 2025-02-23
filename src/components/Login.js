import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate(); // ✅ Correct use of useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

            if (json.success) {
                alert('Login successful');
                localStorage.setItem('token', json.authtoken);
                
                navigate("/dashboard"); // ✅ Correct usage of navigate()
                props.showAlert("Successfully Logged In", "success");
            } else {
             props.showAlert("Invalid credentials","danger");
            }

        } catch (error) {
            console.error("Fetch error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={onChange}
                        value={credentials.password}
                        name="password"
                        id="exampleInputPassword1"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
