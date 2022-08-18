import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import { Link } from 'react-router-dom';
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
                        <li><Link to="/">Projects</Link></li>
                        <li><Link to="/">Resume</Link></li>
                        <li><Link to="/">Blog</Link></li>
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