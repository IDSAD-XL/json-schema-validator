import React, {useState} from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openModal, pushAlert} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import axios, {AxiosResponse} from "axios";
import {userSlice} from "../Redux/Reducers/UserSlice";
import {AlertTypes} from "../Models/IAlert";

interface IPostData {
    name: string,
    email: string,
    password: string
}

const SignInForm = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const handleLoginClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(openModal(modalTypes.login))
    }

    async function fetchRegister () {
        try {
            if (name === "" || email === "" || password === "") return

            const postData: IPostData = {
                name: name,
                email: email,
                password: password
            }

            const response = await axios.post("http://localhost:3080/api/user/register", {...postData})

            if (response.status === 200 && !response.data?.error) {
                const payload = response.data

                dispatch(userSlice.actions.userSetData({
                    name: payload.name,
                    id: payload.id,
                    email: payload.email,
                    schemes: payload.schemes
                }))

                dispatch(userSlice.actions.userSetToken(payload.token))

                dispatch(pushAlert({
                    type: AlertTypes.success,
                    text: `Successfully registered!`
                }))
            } else {
                dispatch(pushAlert({
                    type: AlertTypes.error,
                    text: response.data.error
                }))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <label htmlFor="name" className="input-label">Name</label>
            <input type="text" className="input" id="name" onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email" className="input-label">Email</label>
            <input type="email" className="input" id="email" onChange={(e) => setEmail(e.target.value)}  />
            <label htmlFor="password" className="input-label">Password</label>
            <input type="password" className="input" id="password" onChange={(e) => setPassword(e.target.value)}  />
            <button className="button" onClick={fetchRegister}>Sign Up</button>
            <p>Already have an account? <span className="link" onClick={handleLoginClick}>Log in here</span></p>
        </>
    );
};

export default SignInForm;