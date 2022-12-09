import { AiOutlineClose, AiOutlineDown, AiOutlineMenu } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Cursor from '../partials/Cursor';
import menu from "../../config/menu";
import themes from '../../config/themes';
import { useLocation } from 'react-router-dom'
import useTypewriter from "../../hooks/useTypewriter";

const Header = ({ toggleTheme, currentTheme }) => {
    const [ openMenu, setOpenMenu ] = useState(false);  
    const [breadcrumbs, setbreadcrumbs] = useState([])
    const { pathname } = useLocation();
    const { start, typewritter } = useTypewriter(breadcrumbs, 50, 1);

    useEffect(() => {
        setbreadcrumbs( b => b[b.length - 1] !== pathname ? [...b, pathname !== "/" ? pathname : " "] : b )
        start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm">
            <nav className="navbar">
                <div className="flex-1">
                    <Link to="/" className="hover:bg-transparent btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC{typewritter}</Link>
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
                                    <ul tabIndex="0" className="dropdown-content bg-base-100 px-4 py-2 shadow-none sm:shadow w-52">
                                        {
                                            themes.map((theme, index) =>
                                                <li key={index} className="py-1" >
                                                    <label className="label cursor-pointer p-0 bg-transparent justify-start gap-4">
                                                        <input onChange={(e) => toggleTheme(e.target.value)}  value={ theme.name } type="radio" name="theme" className="radio radio-xs" checked={ currentTheme === theme.name } />
                                                        <span className="label-text">{ theme.label }</span> 
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