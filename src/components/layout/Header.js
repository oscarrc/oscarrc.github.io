import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

import Cursor from '../partials/Cursor';
import menu from "../../config/menu";
import { useState } from 'react';

const Header = () => {
    const [ openMenu, setOpenMenu ] = useState(false);
    return (
        <header className="sticky top-0 z-10">
            <nav className="navbar">
                <div className="flex-1 z-10">
                    <Link to="/" className="btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC <Cursor /></Link>
                </div>
                <div className="flex-none">
                    <ul className={`menu sm:menu-horizontal p-0 ${ openMenu ? 'flex' : 'hidden'} sm:flex`}>
                        {
                            menu.map((item, index) =>
                                <li key={ index } className="group">
                                    <NavLink className=" menu-button transition-all duration-500" to={item.path}>
                                        <span>
                                            {item.label}
                                            <Cursor className="hidden group-hover:inline group-hover:sm:hidden sm:hidden" />
                                        </span>
                                    </NavLink>
                                </li>
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