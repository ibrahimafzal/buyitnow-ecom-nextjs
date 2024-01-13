"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/authContext";
// 
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const navigation = [
    { name: 'Dashboard', href: '/me', current: false },
    { name: 'Sign in', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { cart } = useContext(CartContext)
    const { user, setUser } = useContext(AuthContext)

    const router = useRouter()

    const { data } = useSession()

    const handleSignOut = async () => {
        await signOut()
        toast.info("Logged out!")
        router.push("/login")
    }

    useEffect(() => {
        if (data) {
            setUser(data?.user)
        }
    }, [data])

    const cartItems = cart?.cartItems

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                                <Link href={'/'} className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-12 w-auto"
                                        src="/images/shopy1.png"
                                        alt="Your Company"
                                    />
                                </Link>
                                <div className="hidden md:ml-6 md:flex md:items-center">
                                    <div className="flex space-x-4">
                                        <Link
                                            href="/me"
                                            className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                        >
                                            Dashboard
                                        </Link>

                                        {user &&
                                            <Link
                                                href="/me"
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                            >
                                                Login
                                            </Link>
                                        }

                                        {/* SearchBar */}
                                        <Search />

                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                                <Link
                                    href={"/cart"}
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <i className="text-gray-400 fa fa-shopping-cart">
                                        {user &&
                                            <span className="text-sm ml-1 text-blue-400">({cartItems?.length > 0 ? cartItems?.length : 0})</span>
                                        }
                                    </i>
                                </Link>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={user?.avatar ? user?.avatar : "/images/default.png"}
                                                alt={user?.name}
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/me"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/admin/orders"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        All Orders
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleSignOut}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'flex w-full px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/* {navigation.map((item) => ( */}
                            <Link
                                href="/me"
                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                            >
                                Dashboard
                            </Link>

                            {user &&
                                <Link
                                    href="/me"
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium'
                                >
                                    Login
                                </Link>
                            }
                            {/* ))} */}
                        </div>
                    </Disclosure.Panel>
                    <div className="md:hidden block">
                        <Search />
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default Header;