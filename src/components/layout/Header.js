import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC <span className="animate-blink">_</span></Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;