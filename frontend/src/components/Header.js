import React from "react";

function Header(props){
    return(
        <header className="header">
            <div className="header__logo"></div>
            <nav className="header__nav">
              {props.children}
            </nav>
        </header>
    )
}

export default Header;
