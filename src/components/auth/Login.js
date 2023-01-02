
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: user.id,
                        password: user.password,
                        admin: user.isAdmin
                        // staff: user.isAdmin
                    }))
                    if (user.password === passwordInput) {
                        navigate("/studio")
                    } else {
                        window.alert("Invalid Login")
                    }

                }
                

            })
    }

    return (
        <div className="loginPage">
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="room-name">MiStudio</div>
                    <div className="sign-in">
                        <fieldset>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="login-form-control"
                                placeholder="Enter Email"
                                required autoFocus />
                        </fieldset>
                        <div className="sign-in-pass">
                            <fieldset>
                                <input type="password"
                                    value={passwordInput}
                                    onChange={evt => setPasswordInput(evt.target.value)}
                                    className="login-form-control"
                                    placeholder="Password"
                                    required autoFocus />
                            </fieldset>
                        </div>
                    </div>
                    <div className="sign-in-button">
                        <fieldset>
                            <section className="link--sign-in">
                                <button className="btn btn-dark btn-lg" type="submit">
                                    Sign in
                                </button>
                            </section>
                            <section className="link--register">
                                <Link className="btn btn-dark btn-lg" to="/register">Register</Link>
                            </section>
                        </fieldset>
                    </div>
                </form>
            </section>

        </main>
        </div>
    )
}

