import React, {useState} from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {closeModal, openModal, pushAlert, setToken, setUser} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import axios from "axios";
import {ErrorAlert} from "../Models/Alerts/ErrorAlert";
import {SuccessAlert} from "../Models/Alerts/SuccessAlert";

interface IPostData {
    email: string,
    password: string
}

const SignInForm = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleRegisterClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(openModal(modalTypes.register))
    }

    async function fetchLogin () {
        try {
            if (email === "" || password === "") return

            const postData: IPostData = {
                email: email,
                password: password
            }

            const response = await axios.post("http://localhost:3080/api/user/login", {...postData})

            if (response.status === 200 && !response.data?.error) {
                const payload = response.data

                dispatch(setUser({
                    name: payload.name,
                    id: payload.id,
                    email: payload.email,
                    schemes: payload.schemes
                }))

                dispatch(setToken(payload.token))

                const successAlert = new SuccessAlert(`Welcome, ${payload.name}`)

                dispatch(pushAlert(successAlert))

                dispatch(closeModal())
            } else {
                const errorAlert = new ErrorAlert(response.data.error)
                dispatch(pushAlert(errorAlert))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" className="input" id="email" onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" className="input" id="password" onChange={(e) => setPassword(e.target.value)} />
            <button className="button" onClick={fetchLogin}>Log in</button>
            <p>Don’t have an account? <span className="link" onClick={handleRegisterClick}>Sign up here</span></p>
        </>
    );
};

export default SignInForm;