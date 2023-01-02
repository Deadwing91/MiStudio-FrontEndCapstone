import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="navbar__wrapper">
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/Studio">Studio</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/GuitarRoom">Guitar Room</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/DrumRoom">Drum Room</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/MicLocker">Mic Locker</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/SynthRoom">Synth Room</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Tasks">Tasks</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
        </div>
    )
}

