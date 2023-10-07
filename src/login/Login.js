import React, { useState } from 'react';
import axios from "axios";
import config from "../config";
import {useNavigate} from "react-router";

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        setLoading(true);
        setError(null);

        axios.post(`${config.userAPI}/login`, {
            phone_number: phoneNumber,
            pass_word: password,
        }).then((resp) => {
            setData(resp.data)
            console.log(data)

            navigate("/space")
        }).catch((error) => {
            setError(true)
        }).finally(()=> {
            setLoading(false)
        })
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="phonenumber">PhoneNumber:</label>
                    <input
                        type="text"
                        id="phonenumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
