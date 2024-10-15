import React from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

        if (!isAuthenticated) {
            console.log(isAuthenticated);
            return <h2 className="error">You need to log in to access this page.</h2>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
