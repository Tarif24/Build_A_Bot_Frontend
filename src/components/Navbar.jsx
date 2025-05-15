import Icon from "../assets/Chat_Bot_Icon.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-white decoration-white underline underline-offset-[1rem] hover:-translate-y-2 hover:cursor-pointer transition duration-300 ease-in-out"
            : "text-white hover:-translate-y-2 hover:cursor-pointer transition duration-200 ease-in-out";

    return (
        <nav
            id="home"
            className="p-4 flex h-[10vh] items-center justify-around bg-gray-600"
        >
            <NavLink
                to="/"
                className="flex justify-center items-center gap-2 lg:text-3xl text-2xl hover:cursor-pointer"
            >
                <img src={Icon} alt="Icon" className="size-8 mb-1" />
                <h1 className="font-bold text-white">Build A Bot</h1>
            </NavLink>
            <div className="lg:flex hidden gap-10 text-2xl">
                <NavLink to="/" className={linkClass}>
                    Home
                </NavLink>
                <NavLink to="/chatbot" className={linkClass}>
                    Chat Bot
                </NavLink>
                <NavLink to="/data" className={linkClass}>
                    Data
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
