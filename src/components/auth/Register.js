import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        isAdmin: false
    })
    let navigate = useNavigate()
    const [studio, setStudio] = useState({})
 
    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
           
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("honey_user", JSON.stringify({
                        id: createdUser.id,
                        owner: createdUser.isAdmin
                    }) 
                    )
                    const copy = {...studio}
                    copy.userId = createdUser.id
                    return fetch("http://localhost:8088/studios", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(copy)
                    })
                    .then(navigate("/studio"))

                    
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
    const updateStudio = (evt) => {
        const copy = {...studio}
        copy[evt.target.id] = evt.target.value
        setStudio(copy)
    }

    return (
        <>
        <div className="loginPage">
        <main style={{ textAlign: "center" }}>
            <div className="profile__title">Register for</div><div className="room-name"> MiStudio</div>
            <form  onSubmit={handleRegister}>

            {/* <label className="register-name" htmlFor="fullName"> Full Name </label> */}
                <fieldset className="register-field">
                   
                    <input onChange={updateCustomer}
                           type="text" id="fullName" className="login-form-control"
                           placeholder="Enter Name" required autoFocus />
                </fieldset>
                {/* <label className="register-name" htmlFor="email"> Email address </label> */}
                <fieldset className="register-field">
                    
                    <input onChange={updateCustomer}
                        type="email" id="email" className="login-form-control"
                        placeholder="Email address" required />
                </fieldset>
                {/* <label className="register-name" htmlFor="password"> Password </label> */}
                <fieldset className="register-field">
                    
                    <input onChange={updateCustomer}
                        type="password" id="password" className="login-form-control"
                        placeholder="Enter Password" required />
                </fieldset>
                {/* <label className="register-name" htmlFor="name"> Studio Name </label> */}
                <fieldset className="register-field">
                    
                    <input onChange={updateStudio}
                        type="text" id="name" className="login-form-control"
                        placeholder="Studio Name" required />
                </fieldset>
                {/* <label className="register-name" htmlFor="location"> Studio Location </label> */}
                <fieldset className="register-field">
                    
                    <input onChange={updateStudio}
                        type="text" id="location" className="login-form-control"
                        placeholder="Studio Location" required />
                </fieldset>
                <fieldset className="register-field">
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isAdmin = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isAdmin" />
                    <label className="register-name" htmlFor="email"> Studio Owner </label>
                </fieldset>
                <fieldset className="register-field">
                    <button className="btn btn-dark btn-lg" type="submit"> Register </button>
                </fieldset>
             
            </form>
        </main>
        </div>
        
        </>
    )
}

