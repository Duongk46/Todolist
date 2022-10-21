import React from 'react';
import Clock from './Clock';
import './TopMenu.scss';
function TopMenu() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-topmenu">
                <div className="container-fluid pd-topmenu">
                    <a className="navbar-brand txt-clr">TodoList</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link txt-clr" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link txt-clr" href="/contact">Contact</a>
                            </li>
                        </ul>
                        <Clock />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default TopMenu;