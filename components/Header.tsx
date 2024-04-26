

const Header: React.FC = () => {
    return (
        <>
            <header>
                <h1 className="headerLogo">ToDO</h1>
                <nav>
                    <ul className="headerNav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/todo/overview">To-Do</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}   

export default Header;