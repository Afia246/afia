import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    }) 
    let navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", { // Changed endpoint to /loginuser
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const json = await response.json();
            console.log(json);

            if (!json.success) {
                if (json.errors && json.errors.length > 0) {
                    const errorMessages = json.errors.map(error => error.msg).join('\n');
                    alert(`Validation errors:\n${errorMessages}`);
                } else {
                    alert("Enter valid credentials");
                }
            } else {
                alert("Login successful!");
                localStorage.setItem("userEmail",credentials.email);
                localStorage.setItem("authToken",json.authToken);
               console.log(localStorage.getItem("authToken"))
                navigate("/");

            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to fetch");
        }
    };

    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/creatuser" className='m-3 btn btn-danger'>I am a new user</Link>
                </form>
            </div>
        </div>
    );
}
