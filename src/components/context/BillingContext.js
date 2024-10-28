// src/context/BillingContext.js
import React, { createContext, useState } from 'react';

// Create the BillingContext
export const BillingContext = createContext();

// Create a Provider component
export const BillingProvider = ({ children }) => {
    const [billingDetails, setBillingDetails] = useState(null);

    return (
        <BillingContext.Provider value={{ billingDetails, setBillingDetails }}>
            {children}
        </BillingContext.Provider>
    );
};
