import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="d-flex flex-column p-3 bg-purple rounded-4 navbar-container">
            <div className="text-center mb-4">
                <h2 className="text-white logoText">SALES</h2>
            </div>

            <div className="mb-4">
                <h5 className="sectionTitle text-center">Graphical reports</h5>
                <div className="navButtonsContainer">
                    <button className="navButton">Total sales</button>
                    <button className="navButton">Average sales</button>
                    <button className="navButton">Date Range</button>
                </div>
            </div>

            <div>
                <h5 className="sectionTitle text-center">Tabular report</h5>
                <div className="navButtonsContainer">
                    <button className="navButton">Product sales</button>
                    <button className="navButton">Customer sales</button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
