import React from 'react';

const withLogging = (WrappedComponent) => {
    return (props) => {
        const handleLog = (action) => {
            console.log(`Action: ${action}`);
        };

        return <WrappedComponent {...props} handleLog={handleLog} />;
    };
};

export default withLogging;
