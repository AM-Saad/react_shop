import React from 'react';
import PrivateRoute from './PrivateRoute'

const ContextPrivateRoute: React.FC<any> = ({ Provider, component, ...rest }) => {
    const Component = component;

    return (
        <PrivateRoute {...rest}>
            <Provider>
                <Component />
            </Provider>
        </PrivateRoute>
    );
};

export default ContextPrivateRoute;