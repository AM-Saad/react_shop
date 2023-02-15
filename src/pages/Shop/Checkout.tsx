import { useContext, useEffect } from 'react'
import UserContext from '../../store/User/user_context'
import FetchError from '../../components/Common/FetchError'
import CartItem from '../../components/Shop/Cart/CartProductItem'
import Loading from '../../components/Shop/Cart/Loading'
import CheckoutInterface from '../../modals/Checkout'
import { StateMachineProvider, createStore } from "little-state-machine";
import { useHistory } from "react-router-dom"

import Form from '../../components/Shop/Checkout/Form'


const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    apartment: "",
    floor: "",
    acceptedTerms: false,   // added for our checkbox
    area: "" // added for our select
}

createStore(
    {
        form: initialValues,
        version: 1,
    },
    {
        name: "checkout-form-hadomfactor",
        middleWares: [],
    }
);

const Checkout = () => {
    const { cart, cartMeta, toggle_cart, get_cart, checkout, fetch_zones } = useContext(UserContext)
    let history = useHistory()

    const startProccessing = (orderObject: CheckoutInterface) => {
        checkout!(orderObject)
    }

    useEffect(() => {
        fetch_zones!()
        if (cart && cart.items.length === 0) {
            return history.push(`/shop`)
        }
        toggle_cart?.(false)
    }, [cart])


    return (
        <div className="min-h-full max-w-2xl mx-auto py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="pt-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Checkout</h2>

                <div className='grid sm:grid-cols-2 gap-5'>
                    <div>
                        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                            <div className="md:col-span-1 mb-5">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                            </div>
                            <StateMachineProvider>
                                <Form confirmCheckout={startProccessing} />
                            </StateMachineProvider>
                        </div>

                    </div>

                    <div>
                        {!cartMeta?.loading && cartMeta?.error && <FetchError reload={get_cart!} error={cartMeta?.error} />}

                        {!cartMeta?.loading && !cartMeta?.error && cart?.items?.length === 0 &&
                            <div className='my-11 p-4 text-center text-xl'>
                                <p className='mb-8 font-bold'>Your Cart is Empty 😔</p>
                                <p className='mb-3'>Fill it now 👇</p>
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => toggle_cart?.(false)}
                                >
                                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                </button>
                            </div>
                        }
                        {cartMeta?.loading && !cartMeta.error && <Loading />}

                        {cart && !cartMeta?.loading && !cartMeta?.error &&
                            <div className="mb-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200 overflow-scroll sm:h-96">
                                        {cart.items.map((product) => <CartItem key={product._id} product={product} />)}
                                    </ul>
                                </div>
                            </div>}
                        {cart && cart.items.length > 0 &&
                            <div className="border-t border-gray-200 py-6 ">
                                <div className="border-b-2 mb-5">
                                    <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${cart.total}.00</p>
                                    </div>
                                    <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                                        <p>Shipping</p>
                                        <p>$00.00</p>
                                    </div>
                                    <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                                        <p >Taxes</p>
                                        <p>$00.00</p>
                                    </div>
                                </div>
                                <div className="mb-5 flex justify-between text-base font-medium text-gray-900">
                                    <p className='font-bold'>Total</p>
                                    <p>${cart.total}.00</p>
                                </div>

                            </div>}
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Checkout