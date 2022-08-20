import { AiOutlineClose, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

import Cursor from '../partials/Cursor';
import menu from "../../config/menu";
import themes from '../../config/themes';
import { useState } from 'react';

const Header = ({ toggleTheme, currentTheme }) => {
    const [ openMenu, setOpenMenu ] = useState(false);    

    return (
        <header className="sticky top-0 z-10 backdrop-blur-sm">
            <nav className="navbar">
                <div className="flex-1 z-10">
                    <Link to="/" className="hover:bg-transparent btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC <Cursor /></Link>
                </div>
                <div className="flex-none">
                    <ul className={`menu sm:menu-horizontal px-2 sm:px-0 ${ openMenu && 'open'}`}>
                        {
                            menu.map((item, index) =>
                                <li onClick={ () => setOpenMenu(false) } key={ index } className="group">
                                    <NavLink className="menu-button transition-all duration-500" to={item.path}>
                                        <span>
                                            {item.label}
                                            <Cursor className="hidden group-hover:inline group-hover:sm:hidden sm:hidden" />
                                        </span>
                                    </NavLink>
                                </li>
                            )
                        } 
                        {
                            themes.length &&
                                <li className="dropdown dropdown-end">
                                    <label tabIndex="0" className="menu-button transition-all duration-500">Theme <AiOutlineDown className="h-2 w-2"/></label>
                                    <ul tabIndex="0" className="dropdown-content bg-primary p-2 shadow w-52">
                                        {
                                            themes.map((theme, index) =>
                                                <li key={index} className="py-1" >
                                                    <label class="label cursor-pointer p-0 bg-transparent justify-start gap-4">
                                                        <input onChange={(e) => toggleTheme(e.target.value)}  value={ theme.name } type="radio" name="theme" class="radio" checked={ currentTheme === theme.name } />
                                                        <span class="label-text">{ theme.label }</span> 
                                                    </label>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
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