import { Fragment, useState, useContext } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import AdminContext from '../../store/Admin/admin-context'
import {
    CogIcon,
    HomeIcon,
    MenuAlt2Icon,
    PhotographIcon,
    PlusSmIcon,
    UserGroupIcon,
    ViewGridIcon,
    XIcon,
    CashIcon
} from '@heroicons/react/outline'

import { MapIcon } from '@heroicons/react/solid'

import Search from '../Admin/Search/Search'
const sidebarNavigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: false },
    { name: 'Orders', href: '/admin/orders', icon: CashIcon, current: false },
    { name: 'Products', href: '/admin/products', icon: ViewGridIcon, current: false },
    { name: 'Category', href: '/admin/category', icon: PhotographIcon, current: false },
    { name: 'Zones', href: '/admin/zones', icon: MapIcon, current: false },
    { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon, current: false },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign out' },
]
const quickNavigation = [
    { name: 'New Product', href: '/admin/products/create' },
    { name: 'New Category', href: '/admin/category/create' },
    { name: 'New Zone', href: '/admin/zones/create' },
]

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    children: React.ReactNode
}
export default function AdminNav(props: Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { onLogout, authMeta, isLoggedIn } = useContext(AdminContext)

    return (
        <>

            <div className="flex min-h-screen">
                {/* Narrow sidebar */}
                {isLoggedIn && <div className="hidden w-28 main-bg-color overflow-y-auto md:block">
                    <div className="w-full py-6 flex flex-col items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                alt="Workflow"
                            />
                        </div>
                        <div className="flex-1 mt-6 w-full px-2 space-y-1">
                            {sidebarNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current ? 'bg-white text-white' : 'text-white hover:bg-gray-800 hover:text-white',
                                        'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-white' : 'text-white group-hover:text-white',
                                            'h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    <span className="mt-2">{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>}

                {/* Mobile menu */}
                <Transition.Root show={mobileMenuOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-20 md:hidden" onClose={setMobileMenuOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-1 right-0 -mr-14 p-1">
                                            <button
                                                type="button"
                                                className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                                <span className="sr-only">Close sidebar</span>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex-shrink-0 px-4 flex items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                            alt="Workflow"
                                        />
                                    </div>
                                    {isLoggedIn && <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                                        <nav className="h-full flex flex-col">
                                            <div className="space-y-1">
                                                {sidebarNavigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-white text-white'
                                                                : 'text-white hover:bg-indigo-800 hover:text-white',
                                                            'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-white group-hover:text-white',
                                                                'mr-3 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <span>{item.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>}
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="flex-shrink-0 w-14" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Content area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="w-full">
                        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                            <button
                                type="button"
                                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            {isLoggedIn && <div className="flex-1 flex justify-between items-center px-4 sm:px-6 sm:relative">

                                <Search />

                                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative flex-shrink-0">
                                        <div>
                                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
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
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                onClick={() => item.name === "Sign out" ? onLogout : null}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    <Menu as="div" className="relative flex-shrink-0">
                                        <div>
                                            <Menu.Button className="flex main-bg-color p-1 rounded-full items-center justify-center text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Create New Items</span>
                                                <PlusSmIcon className="h-6 w-6 " aria-hidden="true" />

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
                                                {quickNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <Link
                                                                to={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                </div>
                            </div>}

                            
                        </div>
                    </header>

                    {/* Main content */}
                    <div className="flex-1 flex items-stretch overflow-hidden">
                        <main className="flex-1 overflow-y-auto">
                            {/* Primary column */}
                            <section aria-labelledby="primary-heading" className="min-w-0 flex-1 h-full flex flex-col lg:order-last">
                                <h1 id="primary-heading" className="sr-only">
                                    Admin Panel
                                </h1>
                                {props.children}

                            </section>
                        </main>


                    </div>
                </div>
            </div>
        </>
    )
}