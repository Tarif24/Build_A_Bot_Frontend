import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const HamburgerNav = () => {
    const [isActive, setIsActive] = useState(false);

    const linkClass =
        "hover:text-[#555555] decoration-[#8b8b8b] hover:underline underline-offset-[1rem] hover:cursor-pointer transition duration-300 ease-in-out";

    let hamburgerNavClass = `absolute left-0 top-0 transition duration-600 ease-in-out ${
        isActive ? "translate-y-0" : "-translate-y-75"
    }`;
    let backgroundClass = `absolute left-0 top-0 bg-black w-[100vw] h-[100vh] opacity-40 ${
        isActive ? "" : "hidden"
    }`;

    useEffect(() => {
        if (isActive) {
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isActive]);

    return (
        <div className="lg:hidden flex">
            <div
                className="hover:cursor-pointer"
                onClick={() => {
                    setIsActive(true);
                }}
            >
                <LuMenu size="3rem" color="white" />
            </div>
            <div className={backgroundClass}></div>
            <div id="nav" className={hamburgerNavClass}>
                <div className="flex flex-col justify-center items-center gap-8 py-8 text-center w-[100vw] bg-white rounded-b-2xl">
                    <div
                        className="absolute right-4 top-4 hover:cursor-pointer"
                        onClick={() => {
                            setIsActive(false);
                        }}
                    >
                        <IoMdClose size="2rem" />
                    </div>
                    <NavLink
                        to="/"
                        className={linkClass}
                        onClick={() => {
                            setIsActive(false);
                        }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/chatbot"
                        className={linkClass}
                        onClick={() => {
                            setIsActive(false);
                        }}
                    >
                        Chat Bot
                    </NavLink>
                    <NavLink
                        to="/data"
                        className={linkClass}
                        onClick={() => {
                            setIsActive(false);
                        }}
                    >
                        Data
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HamburgerNav;
