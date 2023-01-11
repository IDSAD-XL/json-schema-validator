import React from 'react';

const SignInForm = () => {
    return (
        <>
            <label htmlFor="email" className="input-label">Email</label>
            <input type="text" className="input" id="email" />
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" className="input" id="password" />
            <button className="button">Log in</button>
            <p>Don’t have acc? <span className="link">Sign up here</span></p>
        </>
    );
};

export default SignInForm;