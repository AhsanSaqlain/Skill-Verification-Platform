import React, { useState } from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline"
import axiosInstance from '../utils/axiosInstance'

const SignUp = ({ model }) => {

    const [ formValues, setFormValues ] = useState({ first_name: '', last_name: '', email: '', phone: '', password: '', dob: '', education: '', qualification: '', gender: '' })
    const [ passportPhoto, setPassportPhoto ] = useState()
    const [ liveScanPhoto, setLiveScanPhoto ] = useState()
    const [ response, setRespnse ] = useState({})
    
    const signupHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        const formData = new FormData()

        // Collection of Data into FormData
        formData.append('first_name', formValues.first_name)
        formData.append('last_name', formValues.last_name)
        formData.append('email', formValues.email)
        formData.append('phone', formValues.phone)
        formData.append('password', formValues.password)
        formData.append('dob', formValues.dob)
        formData.append('education', formValues.education)
        formData.append('qualification', formValues.qualification)
        formData.append('gender', formValues.gender)
        formData.append('passport_photo', passportPhoto)
        formData.append('live_scan_photo', liveScanPhoto)

        
        try {
            const response = await axiosInstance.post("/api/user/signup", formData)
            model.setShowSignupModal(false);
        } catch (err) {
            console.log(err)
            setRespnse({ error: err.response.statusText })
        } finally {
            setIsLoading(false)
            setTimeout(() => {
                setRespnse({})
            }, 3000);
        }    
    }
    
    const [ isLoading, setIsLoading ] = useState(false)

    const inputHandler = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                <h3>Create Account</h3>
                <button
                    className="modal-close"
                    onClick={() => model.setShowSignupModal(false)}
                >
                    <XMarkIcon className="close-icon" />
                </button>
                </div>
                <form className="auth-form" >
                <div className="input-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" name="dob" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="e.g., +1 (555) 123-4567" onChange={ inputHandler } required />
                </div>
                <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" onChange={ inputHandler } required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="education">Education Level</label>
                    <select id="education" name="education" onChange={ inputHandler } required>
                        <option value="">Select Education Level</option>
                        <option value="high-school">High School</option>
                        <option value="bachelors">Bachelor's Degree</option>
                        <option value="masters">Master's Degree</option>
                        <option value="phd">Ph.D.</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="qualification">Professional Qualification</label>
                    <textarea id="qualification" name="qualification" placeholder="Enter your professional qualifications, certifications, or relevant experience" onChange={ inputHandler } required></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="passport_photo">Profile Picture</label>
                    <input type="file" id="passport_photo" name='passport_photo' accept="image/*" onChange={ (e) => setPassportPhoto(e.target.files[0]) }  required />
                </div>
                <div className="input-group">
                    <label htmlFor="live_scan_photo">Live Scan Photo</label>
                    <div className="live-scan-container">
                    <input 
                        type="file" 
                        id="live_scan_photo" 
                        name="live_scan_photo"
                        accept="image/*" 
                        capture="user" 
                        onChange={ (e) => setLiveScanPhoto(e.target.files[0]) } 
                        required 
                        style={{ display: 'none' }}  // Ensure it's hidden visually, but still functional
                    />
                    <button 
                        type="button" 
                        className="scan-btn-full" 
                        onClick={() => document.getElementById('live_scan_photo').click()}
                    >
                        Take Photo
                    </button>
                    </div>
                    <small className="field-hint">Please take a clear photo of your face for verification purposes.</small>
                </div>
                <div className="terms-checkbox">
                    <input type="checkbox" id="signup-terms" required />
                    <label htmlFor="signup-terms">
                    I agree to the <a href="#!">Terms of Service</a> and{" "}
                    <a href="#!">Privacy Policy</a>
                    </label>
                </div>
                {
                    isLoading ? 
                    <button type="submit" className="cta-btn primary" onClick={ (e) => e.preventDefault() }>
                    Creating account...
                    </button> : 
                    <button type="submit" className="cta-btn primary" onClick={ signupHandler }>
                    Create Account
                    </button>
                }
                { response.error && <p>{ response.error }</p> }
                </form>
                <div className="auth-footer">
                <p>
                    Already have an account?{" "}
                    <button
                    className="text-button"
                    onClick={() => {
                        model.setShowSignupModal(false);
                        model.setShowLoginModal(true);
                    }}
                    >
                    Log in
                    </button>
                </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
