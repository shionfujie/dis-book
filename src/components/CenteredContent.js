import React from 'react';
import './CenteredContent.css';

const CenteredContent = ({children}) => {
    return (
        <div className="CenteredContent">
            {children}
        </div>
    );
}

export default CenteredContent
