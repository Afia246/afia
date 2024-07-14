import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: "" // Updated to use `location`
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/creatuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
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
                alert("Signup successful!");
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
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} id="name" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} id="location" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    );
}
