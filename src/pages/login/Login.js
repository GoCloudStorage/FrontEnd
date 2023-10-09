import React, { useState } from 'react';
import {useNavigate} from "react-router";
import {login} from "../../store/user/UserSlice";
import {useDispatch} from "react-redux";

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        setLoading(true);
        dispatch(login(phoneNumber, password))
        navigate("/space")
        setLoading(false)
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
                    <button type="submit" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
