import React, {useState} from 'react';
import {useAppDispatch} from "../Hooks/redux";
import {openModal} from "../Redux/ActionCreators";
import {modalTypes} from "../Redux/Reducers/ModalSlice";
import axios from "axios";
import {userSlice} from "../Redux/Reducers/UserSlice";

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

            if (response.status === 200) {
                const payload = response.data

                dispatch(userSlice.actions.userSetData({
                    name: payload.name,
                    id: payload.id,
                    email: payload.email,
                    schemes: payload.schemes
                }))

                dispatch(userSlice.actions.userSetToken(payload.token))
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