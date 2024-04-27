import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";


const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(sessionStorage.getItem("loggedInUserDetails") === null){
            setIsLoggedIn(false);
            return;
        }
        const user = JSON.parse(sessionStorage.getItem("loggedInUserDetails") || '');
        setLoggedInUser(user.username);
        setIsLoggedIn(true);

    }, []);

    const logout = () => {
        sessionStorage.removeItem("loggedInUserDetails");
        sessionStorage.removeItem("loggedInUserToken");
        setIsLoggedIn(false);
        router.push("/");
    }

    const handleProfileDropdownHover = (isOpen: boolean) => {
        setIsProfileDropdownOpen(isOpen);
      };


    return (
        <>
            <header>
                <button onClick={()=> router.push("/")} className="headerLogo">ToDo</button>
                
                <nav>
                    <ul className="headerNav">
                        {isLoggedIn && (
                            <div className="headerNav">
                                <button className="navItem"><a href="/todo/overview">To-Do</a> </button>
                                <div
                                    className="relative"
                                    onMouseEnter={() => handleProfileDropdownHover(true)}
                                    onMouseLeave={() => handleProfileDropdownHover(false)}
                                    >
                                    <button className="navItemDropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                        <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                                    </svg>
                                    {loggedInUser}
                                    </button>
                                        <div className={`absolute dropdown z-10 right-0 py-2 bg-white rounded-lg shadow-md ${isProfileDropdownOpen ? "" : "hidden"}`}>
                                            <button className="dropDownItem"><a href="/profile">Profile</a></button>
                                            <button className="dropDownItem" onClick={logout}>Logout</button>
                                        </div>
                                    </div>
                            </div>
                        )}
                        {!isLoggedIn &&(<div className="headerNav">
                            <button className="navItem"><a href="/register">Register</a> </button>
                            <button className="navItem"><a href="/login">Login</a> </button>
                        </div>)}
                        
                    </ul>
                </nav>
            </header>
        </>
    )
}   

export default Header;