import React from 'react';

function Header({handleLogout}) {
return (
        <header>
            <h1>Keeper</h1> 
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
}

export default Header;