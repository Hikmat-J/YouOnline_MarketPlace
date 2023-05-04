import React from 'react';

export default function Tab(props) {
    return (
        
        <div id={props.id} role="tabpanel" tabIndex={props.tabIndex}>
                {props.children}
        </div>
            
    );
}
