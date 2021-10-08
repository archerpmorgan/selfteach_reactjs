import React, { useState } from 'react';
import { MenuItems } from "./MenuItems";
import { Button } from "./Button";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useIsAuthenticated, MsalProvider, useMsal, useAccount } from "@azure/msal-react";


function Navbar() {

    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();
    const [clicked, setClicked] = useState(false);

    const signOut = () => {
        instance.logout();
    }

    const signIn = async () => {
        try {
            const loginResponse = await instance.loginPopup({});
        } catch (err) {
            console.log(err);
        }
        window.location.reload();
    }

    const loginButton = isAuthenticated? <Button onClick={signOut} >Sign Out</Button> : <Button onClick={signIn} >Sign In</Button>

    const navStyleSignedIn = {
            color: "black",
            fontFamily: "Palatino",
            textDecoration: 'none',
            padding: "0.5rem 1rem"
    };

    const navStyleSignedOut = {
        color: "grey",
        fontFamily: "Palatino",
        textDecoration: 'none',
        padding: "0.5rem 1rem"
};

    return (
        <nav className="NavbarItems">

            <h1 className="navbar-logo">Selfteach</h1>

            <div className="menu-icon" onClick={ () => setClicked( !clicked )}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => {
                    return (
                        <Link key={index} to={isAuthenticated? `/${clean(item.title)}` : "#"} style={isAuthenticated? navStyleSignedIn : navStyleSignedOut}>
                            <li>
                                {item.title}
                                <i className={item.icon} ></i>
                            </li>
                        </Link>
                    )
                })}
                <NavButton/>
            </ul>
            {loginButton}
        </nav>
    );
}


function NavButton() {

    const data = {
        title: 'Sign up',
        url: '#',
        cName: 'nav-links-mobile'
    }
    
    return (
        <li>
            <a className={data.cName} href={data.url}>
            {data.title}
            <i className={data.icon}></i>
            </a>
        </li>
    );
}

// strip spaces and lowercase
function clean( name ) {
    return name.toLowerCase().replace(/\s/g, '')
}

export default Navbar