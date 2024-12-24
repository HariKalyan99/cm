"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {signOut, signIn, useSession, getProviders} from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] =  useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setProvidersFn = async () => {
        const response = await getProviders();
        setProviders(response);
    }

    setProvidersFn();
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="text_logo">AI</p>
      </Link>
      {/* Desk navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">Create Post</Link>

            <button type="button" onClick={signOut}  className="outline_btn">
                Sign out
            </button>

            <Link href={"/profile"}>
            <Image src={"/assets/images/logo.svg"}
            width={30} height={30} className="rounded-full" alt="profile"/>
            </Link>
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map((provider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                Sign In
            </button>
          ))}
          </>
        )}
      </div>


      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
            <div className="flex">
                <Image src={"/assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropDown(p => !p)}
                />

                {toggleDropDown && (
                    <div className="dropdown">
                        <Link href={"/profile"}
                            className="dropdown_link"
                            onClick={() => setToggleDropDown(false)}
                        >
                            My Profile
                        </Link>

                        <Link href={"/create-promt"}
                            className="dropdown_link"
                            onClick={() => setToggleDropDown(false)}
                        >
                            Create Prompt
                        </Link>

                        <button type="button" onClick={() => {setToggleDropDown(false);
                            signOut();
                        }} className="mt-5 w-full black_btn">
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        ) : (
            ( <>
                {providers && Object.values(providers).map((provider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                      Sign In
                  </button>
                ))}
                </>)
        )}
      </div>
    </nav>
  );
};

export default Nav;
