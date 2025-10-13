import React, { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline"
import axiosInstance from '../utils/axiosInstance'

const Login = ({ model }) => {
    const [ formValues, setFormValues ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    
    const loginHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append("email", formValues.email)
        formData.append("password", formValues.password)
        
        try {
            const response = await axiosInstance.post("/api/user/login", formData)
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            window.location.href = "/dashboard";
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }    
    }
    

    const inputHandler = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <h3>Login</h3>
                <button
                    className="modal-close"
                    onClick={() => model.setShowLoginModal(false)}
                >
                    <XMarkIcon className="close-icon" />
                </button>
                </div>
                <form className="auth-form">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required onChange={ inputHandler } />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={ inputHandler } />
                </div>
                <div className="input-group">
                    <label htmlFor="login-picture">Profile Picture (for verification)</label>
                    <input type="file" id="login-picture" accept="image/*" required />
                </div>
                <div className="form-actions">
                    <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                    </label>
                    <a href="#!" className="forgot-password">
                    Forgot password?
                    </a>
                </div>
                {
                    isLoading ? 
                    <button type="submit" className="cta-btn primary" onClick={ (e) => e.preventDefault() }>
                    Logging in...
                    </button> : 
                    <button type="submit" className="cta-btn primary" onClick={ loginHandler }>
                    Login
                    </button>
                }
                </form>
                <div className="auth-footer">
                <p>
                    Don't have an account?{" "}
                    <button
                    className="text-button"
                    onClick={() => {
                        model.setShowLoginModal(false);
                        model.setShowSignupModal(true);
                    }}
                    >
                    Sign up
                    </button>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Login
