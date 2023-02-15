import React, { useState, useEffect, useReducer, useContext } from "react";

import AuthContext from "../store/User/user_context";

const nameReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.length > 0 }

    }
}
const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: action.value.includes('@') }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') }

    }
}
const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.length > 0 }

    }
}
const confirmPasswordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.value, isValid: action.value.length > 0 }
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.length > 0 }

    }
}



function SignUp() {
    const ctx = useContext(AuthContext)
    const [nameState, dispatchNameState] = useReducer(nameReducer, { value: '', isValid: null })
    const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: null })
    const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: null })
    const [confirmPasswordState, dispatchConfirmPasswordState] = useReducer(confirmPasswordReducer, { value: '', isValid: null })
    const [formIsValid, setFormIsValid] = useState(false)
    const [errorMsg, setErrorMsg] = useState(ctx.authMeta.error)


    // Submit user name
    function submit(e) {
        // Dispatch the user email to the store
        e.preventDefault()
        ctx.onSignup(nameState.value, emailState.value, passwordState.value, confirmPasswordState.value)
    }

    const nameChangeHandler = (e) => {
        dispatchNameState({ type: 'USER_INPUT', value: e.target.value })
    }
    const checkNameValidity = (e) => {
        dispatchNameState({ type: 'INPUT_BLUR' })

    }
    const emailChangeHandler = (e) => {
        dispatchEmailState({ type: 'USER_INPUT', value: e.target.value })
    }
    const checkEmailValidity = (e) => {
        dispatchEmailState({ type: 'INPUT_BLUR' })

    }
    const passwordChangeHandler = (e) => {
        dispatchPasswordState({ type: 'USER_INPUT', value: e.target.value })
    }
    const checkPasswordValidity = (e) => {
        dispatchPasswordState({ type: 'INPUT_BLUR' })
    }

    const confirmPasswordChangeHandler = (e) => {
        dispatchConfirmPasswordState({ type: 'USER_INPUT', value: e.target.value })
    }
    const checkPasswordMatchValidity = (e) => {
        dispatchConfirmPasswordState({ type: 'INPUT_BLUR' })
    }

    const { isValid: nameValid } = nameState
    const { isValid: emailValid } = emailState
    const { isValid: passwordValid } = passwordState
    const { isValid: confirmPasswordValid } = confirmPasswordState

    useEffect(() => {
        setErrorMsg(ctx.authMeta.error)
        setFormIsValid(nameValid && emailValid && passwordValid && confirmPasswordValid)
    }, [ctx,nameValid, emailValid, passwordValid, confirmPasswordValid])

    const SubmitButton = () => {
        if (ctx.authMeta.loading) {
            return <button
                className="opacity-30 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Loading...
            </button>
        } else {
            return <button
                type="submit"
                disabled={ctx.authMeta.loading || !formIsValid}
                className={`${!formIsValid ? 'opacity-30 ' : ' '}  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
                Sign in
            </button>

        }
    }

    return <>

        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create New Account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login Here
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6 text-left" onSubmit={(e) => submit(e)}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    onChange={nameChangeHandler}
                                    onBlur={checkNameValidity}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
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
                        <div>
                            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                               Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmpassword"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={confirmPasswordChangeHandler}
                                    onBlur={checkPasswordMatchValidity}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <p className="text-red-500">{errorMsg}</p>
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="/forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            {SubmitButton()}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}

export default SignUp;