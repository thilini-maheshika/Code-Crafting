'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState , useEffect } from 'react'
import { signIn, signOut, useSession , getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession();
    const [ providers , setProviders] = useState(null);
    const [toggleDropdown , settoggleDropdown ] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    },[])

  return (
    <nav className='w-full pt-3 mb-16 flex-between'>
        <Link href={'/'} className='flex gap-2 flex-center'>
            <Image src={"/assets/images/logo.svg"} alt='CodeCrafters logo' width={30} height={30} className='object-contain'  />
            <p className='font-bold logo_text'>CodeCrafters</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden sm:flex'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href={'/create-prompt'} className='black_btn'>
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href={'/profile'}>
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                    />
                    </Link>
                </div>
            ) : (
                <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button 
                            type='button'
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'
                        >
                            Sign In
                        </button>
                    ))
                }
                </>
            )}
        </div>

        {/* Mobile Navigation */}
            <div className='relative flex sm:hidden'>
                {session?.user ? (
                    <div className='flex'>
                        <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='profile'
                        onClick={() => settoggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link 
                                href={'/profile'}
                                className='dropdown_link'
                                onClick={() => settoggleDropdown(false)}
                            >
                                My Profile
                            </Link>

                            <Link 
                                href={'/create-prompt'}
                                className='dropdown_link'
                                onClick={() => settoggleDropdown(false)}
                            >
                                Create Post
                            </Link>

                            <button 
                            type='button'
                            onClick={() => {
                                settoggleDropdown(false)
                                signOut();
                            }}
                            className='w-full mt-5 black_btn'
                        >
                            Sign Out
                        </button>

                        </div>
                    )}
                    </div>
                ) : (
                    <>
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button 
                            type='button'
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className='black_btn'
                        >
                            Sign In
                        </button>
                    ))
                }
                </>
                )}
            </div>
    </nav>
  )
}

export default Nav