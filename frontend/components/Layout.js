import React from 'react';
import AppHeader from "./AppHeader";

function Layout(props) {
    const children = props.children;
    return (
        <div>
            <AppHeader/>
            {children}
        </div>
    );
}

export default Layout;