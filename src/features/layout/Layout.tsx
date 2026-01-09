import { Link, Outlet } from "react-router-dom";
import { useContext, useRef, type FormEvent } from "react";
import "./ui/Layout.css";
import AppContext from "../context/AppContext";
import Base64 from "../../shared/base64/Base64";

export default function Layout() {
    const {user, setUser, request} = useContext(AppContext)!;
    const closeModalRef = useRef<HTMLButtonElement>(null);

    const authSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const login = formData.get("user-login");
        const password = formData.get("user-password");
        console.log(login, password);
        // RFC 7617   https://datatracker.ietf.org/doc/html/rfc7617
        const userPass = login + ':' + password;
        const basicCredentials = Base64.encode(userPass);
        request("api://User/ApiAuthenticate", {
            method: 'GET',
            headers: {
                'Authorization': "Basic " + basicCredentials
            }
        }, true)
        .then(j => {
            if (j.status.code >= 400) {
                console.log(j.data);
            }
            else {
                setUser(j.data);
                closeModalRef.current?.click();
                // також зберігаємо одержані дані у window.localStorage
                // а до стартового ефекту App додаємо коди перевірки чи є дані у window.localStorage
                // А також коди видалення запису з window.localStorage при виході з авт. режиму
                // Впровадити "галочку" <<запам'ятати мене>> і від її значення вирішувати
                //  чи зберігати дані у window.localStorage
            }
        });
    };

    return <>
        <header className="d-flex justify-content-between align-items-center">
            <div className="d-flex  align-items-center">
                    <Link to="/" className="nav-link m-3 fw-semibold">Каталог</Link>
                
                    <Link to="/profile" className="nav-link m-2 text-dark">Profile</Link>
                
                    <Link to="/profile" className="nav-link m-2 text-dark">Profile</Link>
            </div>    
            {user == null
            ? <>
                <button type="button" className="btn btn-outline-secondary"
                        data-bs-toggle="modal" data-bs-target="#authModal">
                    <i className="bi bi-box-arrow-in-right"></i>
                </button>
            </>
            : <div>
                <Link to="/profile" className="btn btn-outline-success">
                    {user.name.charAt(0)}
                </Link>
                <button onClick={() => setUser(null)} type="button" className="btn btn-outline-secondary">
                    <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>}        
            
        </header>
        <main className="container"><Outlet /></main>
        <footer>Footer</footer>

        <div className="modal fade" id="authModal" tabIndex={-1} aria-labelledby="authModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="authModalLabel">Вхід до сайту</h1>
                        <button ref={closeModalRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="auth-form" onSubmit={authSubmit}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="login-addon"><i className="bi bi-key"></i></span>
                                <input type="text" className="form-control "
                                    name="user-login" placeholder="Login"
                                    aria-label="Login" aria-describedby="login-addon"/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="user-password-addon"><i className="bi bi-lock"></i></span>
                                <input type="password" className="form-control "
                                    name="user-password" placeholder="Password"
                                    aria-label="Password" aria-describedby="user-password-addon"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div id="auth-error" className="alert alert-danger py-2" role="alert">
                            A simple danger alert—check it out!
                        </div>
                        <button type="button" className="btn btn-secondary py-2" data-bs-dismiss="modal">Скасувати</button>
                        <button type="submit" className="btn btn-primary py-2" form="auth-form">Вхід</button>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
/*
Реалізувати розмітку фронтенд-проєкта за аналогією з Razor-варіантом
*/