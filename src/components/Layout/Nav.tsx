import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../store/User/user_context'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import SideCart from '../Shop/Cart/Side-cart'
import Search from '../Shop/Search'
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    children?: React.ReactNode
};

const Nav: React.FC<Props> = (props) => {
    const { toggle_cart, cart } = useContext(UserContext)
    const [cartChanged, setCartChanged] = useState<boolean>(false)
    useEffect(() => {
        setCartChanged(true)
        const timer = setTimeout(() => setCartChanged(false), 500);
        return () => clearTimeout(timer)
    }, [cart?.items])

    const Links = [

        <Link
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            key='shop'
            to='/my-shop' >Shop </Link>,
        <Link
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            key='category'

            to='/category' >Category </Link>
    ]
    const subMenuItems = [
        <Menu.Item>
            {({ active }) => (
                <Link
                    to="/login"
                    key='login'

                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                    Login
                </Link>
            )}
        </Menu.Item>,
        <Menu.Item>
            {({ active }) => (
                <Link
                    to="/admin/login"
                    key='admin/login'

                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                    Administration
                </Link>
            )}
        </Menu.Item>,
    ]
    return (
        <>
            <Disclosure as="nav" className="bg-white shadow sticky top-0 z-30">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex px-2 lg:px-0">
                                    <Link to="/" className="flex-shrink-0 flex items-center">
                                        <h1 className='logo-font text-2xl'>Hdom Factory</h1>

                                    </Link>
                                    <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                        {Links.map(link => link)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end w-full">
                                    <Search />

                                    <div className="flex items-center lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className='text-gray-400 hover:text-gray-500 cursor-pointer flex gap-1' onClick={() => toggle_cart?.(true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {cart && cart.items.length > 0 && <span className={`bg-red-400 flex h-5 items-center justify-center p-1 rounded-full text-white w-5 transform transition-transform ${cartChanged ? 'scale-125' : 'scale-100'}`}>
                                            {cart?.items.length}
                                        </span>}
                                    </div>
                                    <SideCart />
                                    <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                        <button
                                            type="button"
                                            className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-4 relative flex-shrink-0">
                                            <div>
                                                <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                                    {subMenuItems.map(menuItem => menuItem)}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <Disclosure.Panel className="lg:hidden">
                            <div className="pt-2 pb-3 space-y-1 grid">
                                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}

                                {Links.map(link => link)}

                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                        <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Your Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}

            </Disclosure>
            <div className="shop-bg">

                {props.children}
            </div>
        </>
    )
}

export default Nav