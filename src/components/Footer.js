import React from 'react';

function Footer() {

    let date = new Date();
    let year = date.getFullYear();


    return (
        <footer>
            <h3>Copyright © {year} </h3>
        </footer>
    );
}

export default Footer;