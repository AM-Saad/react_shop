import { useEffect, useContext } from 'react'
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom'
import CheckoutInterface from '../../../modals/Checkout'

import Input from '../../UI/Input'
import SelectBox from './SelectBox'
import { useStateMachine } from "little-state-machine";

import { updateForm } from "./stateMachineActions"
import { Checkbox } from './Checkbox';
import CheckoutError from './CheckoutError';

import UserContext from '../../../store/User/user_context'
import { PlaceOrderButton } from './PlaceOrderButton';

const validationScheme = Yup.object({
    firstname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    phone: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    street: Yup.string()
        .max(200, "Must be 20 characters or less")
        .required("Required"),
    apartment: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    floor: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    acceptedTerms: Yup.boolean()
        .required("Required")
        .oneOf([true], "You must accept the terms and conditions."),
    area: Yup.string()
        // specify the set of valid values for job type
        // @see http://bit.ly/yup-mixed-oneOf
        // .oneOf(
        //     ["designer", "development", "product", "other"],
        //     "Invalid Job Type"
        // )
        .required("Required")
})


const FormObserver: React.FC = () => {
    const { actions } = useStateMachine({ updateForm });
    const { values } = useFormikContext();
    useEffect(() => {
        actions.updateForm(values)
    }, [values])
    return null;
};



const MyForm: React.FC<{ confirmCheckout: (form: CheckoutInterface) => void }> = ({ confirmCheckout }) => {
    const { state } = useStateMachine({ updateForm });
    const { cartMeta, checkoutMeta, zones } = useContext(UserContext)

    return (
        <Formik
            enableReinitialize
            initialValues={state.form}
            validationSchema={validationScheme}
            onSubmit={async (values, { setSubmitting }) => {
                confirmCheckout(values)
            }}
        >
            {({ handleSubmit, errors }: any) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <FormObserver />
                        <div className='flex gap-2 items-center justify-between'>

                            <Input
                                label="First Name"
                                name="firstname"
                                type="text"
                                placeholder="Jane"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                            <Input
                                label="Last Name"
                                name="lastname"
                                type="text"
                                placeholder="Doe"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                        </div>

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="jane@formik.com"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                        />
                        <Input
                            label="Phone"
                            name="phone"
                            type="text"
                            placeholder="0123456789"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                        />
                        <SelectBox
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"
                            label="area" name="area">
                            <option value="" label="Select a zone">
                                Select a zone{" "}
                            </option>
                            {zones!.map(zone => <option value={zone.zoneId} key={zone.zoneId}>{zone.name}</option>)}
                        </SelectBox>
                        <Input
                            label="Street"
                            name="street"
                            type="text"
                            placeholder="1 main street"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"
                        />
                        <div className='flex gap-2 items-center justify-between'>

                            <Input
                                label="Apartment"
                                name="apartment"
                                type="text"
                                placeholder="7"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"

                            />
                            <Input
                                label="Floor"
                                name="floor"
                                type="number"
                                placeholder="2"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3 my-2"
                            />
                        </div>

                        <Checkbox name="acceptedTerms">
                            I accept the terms and conditions
                        </Checkbox>

                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                        <PlaceOrderButton cartMeta={cartMeta} checkoutMeta={checkoutMeta} />

                        {checkoutMeta?.error && <CheckoutError error={checkoutMeta?.error} />}

                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link
                                    to="/shop"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>

                    </form>
                )
            }
            }
        </Formik>
    )

}
export default MyForm



