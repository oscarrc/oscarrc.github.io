import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case font-mono text-xl">&gt; Oscar RC <span className="ml-1 animate-blink">_</span></Link>
                </div>
                <div class="flex-none">
                    <ul class="menu menu-horizontal p-0">
                        <li><Link to="/"><button>Projects</button></Link></li>
                        <li><Link to="/"><button>Resume</button></Link></li>
                        <li><Link to="/"><button>Blog</button></Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;