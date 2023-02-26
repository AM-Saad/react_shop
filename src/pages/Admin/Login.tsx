import React, { useState, useEffect, useReducer, useContext } from "react";
import AdminContext from "@/store/Admin/admin-context";


enum ActionKind {
    USER_INPUT = 'USER_INPUT',
    INPUT_BLUR = 'INPUT_BLUR',
}

type Action = {
    type: ActionKind,
    value: string
}
interface InputState {
    value: string;
    isValid: boolean;
}


const emailReducer = (state: InputState, action: Action): InputState => {
    if (action.type === ActionKind.USER_INPUT) {
        return { value: action.value, isValid: action.value.includes('@') }
    }
    if (action.type === ActionKind.INPUT_BLUR) {
        return { value: state.value, isValid: state.value.includes('@') }

    }
    return state

}
const passwordReducer = (state: InputState, action: Action): InputState => {
    if (action.type === ActionKind.USER_INPUT) {
        return { value: action.value, isValid: action.value!.length > 0 }
    }
    if (action.type === ActionKind.INPUT_BLUR) {

        return { value: state.value, isValid: state.value!.length > 0 }
    }
    return state
}



const Login: React.FC = () => {
    const { authMeta, onLogin } = useContext(AdminContext)
    const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: false })
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: false })
    const [formIsValid, setFormIsValid] = useState<boolean | null>(false)
    const [errorMsg, setErrorMsg] = useState(authMeta.error)


    // Submit user name
    function submit(e: React.FormEvent) {
        // Dispatch the user email to the store
        e.preventDefault()
        onLogin(emailState.value, passwordState.value)
    }

    const emailChangeHandler = (e: any) => {
        dispatchEmailState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkEmailValidity = (e: any) => {
        dispatchEmailState({ type: ActionKind.INPUT_BLUR, value: '' })

    }
    const passwordChangeHandler = (e: any) => {
        dispatchPasswordState({ type: ActionKind.USER_INPUT, value: e.target.value })
    }
    const checkPasswordValidity = (e: any) => {
        dispatchPasswordState({ type: ActionKind.INPUT_BLUR, value: '' })
    }

    const { isValid: emailValid } = emailState
    const { isValid: passwordValid } = passwordState

    useEffect(() => {
        setErrorMsg(authMeta.error)
        setFormIsValid(emailValid && passwordValid)
    }, [authMeta, emailValid, passwordValid])


    return <>

        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6 text-left" onSubmit={(e) => submit(e)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={emailChangeHandler}
                                    onBlur={checkEmailValidity}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                {!emailState.isValid && <p className="text-red-400">Please add your email</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={passwordChangeHandler}
                                    onBlur={checkPasswordValidity}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <p className="text-red-500">{errorMsg}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="/admin/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={authMeta.loading || !formIsValid}
                                className={`${!formIsValid ? 'opacity-30 ' : ' '}  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                {authMeta.loading ? 'Loading...' : 'Sign in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}

export default Login;