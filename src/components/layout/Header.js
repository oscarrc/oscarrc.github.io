import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

import menu from "../../config/menu";
import { useState } from 'react';

const Header = () => {
    const [ openMenu, setOpenMenu ] = useState(false);

    return (
        <header className="sticky top-0">
            <nav className="navbar">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC <span className="ml-1 animate-blink">_</span></Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal p-0 hidden sm:flex">
                        {
                            menu.map((item, index) =>
                                <li key={ index }><NavLink className="menu-button" to={item.path}>{item.label}</NavLink></li>
                            )
                        } 
                    </ul>
                    <button onClick={ () => setOpenMenu(!openMenu) } className="sm:hidden mr-2">                        
                        <label className={`swap swap-rotate ${openMenu && 'swap-active'}`}> 
                            <AiOutlineClose className="swap-on h-6 w-6" />
                            <AiOutlineMenu className="swap-off h-6 w-6" />
                        </label>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header;