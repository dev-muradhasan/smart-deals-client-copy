import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import MyContainer from "../../MyContainer/MyContainer";
import { links } from "./Links";


const Navbar = () => {
    const { user, signOutUser, setLoading } = use(AuthContext)

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                setLoading(false)
            })
    }

    return (
        <div className="bg-base-100 shadow-sm">
            <MyContainer className={'navbar'}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="mr-2.5 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="text-xl font-bold">Smart<span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Deals</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <Link onClick={handleSignOut} to={'/login'} className="btn btn-primary btn-gradient">Logout</Link> : <div className="flex gap-3"><Link to={'/login'} className="btn btn-outline text-primary bg-white border-primary">Login</Link>
                        <Link to={'/register'} className="btn btn-gradient text-white">Register</Link></div>}

                </div>
            </MyContainer>
        </div>
    );
};

export default Navbar;