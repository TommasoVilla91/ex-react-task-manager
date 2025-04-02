import { NavLink } from "react-router-dom"

function NavBar() {

    const navLinks = [
        {
            path: "/",
            title: "TaskList"
        },
        {
            path: "/create",
            title: "AddTask"
        }
    ];

    return (
        <div className="navbar">
            {navLinks.map((link, i) => (
                <NavLink key={i} to={link.path} className="navlink">{link.title}</NavLink>
            ))}
        </div>
    )
}

export default NavBar;