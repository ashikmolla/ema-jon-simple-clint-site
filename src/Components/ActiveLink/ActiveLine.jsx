import React, { Children } from 'react';
import { NavLink} from 'react-router-dom';
import './ActiveLink.css'

const ActiveLine = ({to, children}) => {
    
    return (
        <NavLink
                    to={to}
                    className={({ isActive}) =>
                      isActive
                        ? "active"
                        : ""
                    }
                  >
                    {children}
                  </NavLink>
    );
};

export default ActiveLine;