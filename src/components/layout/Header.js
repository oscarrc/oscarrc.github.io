import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Oscar R.C.</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;