import React, { createContext, useContext, useState, useEffect } from 'react';

const AlertContext = createContext(null);

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null); // { message, type, callback }

    const showAlert = (message, type = 'success', callback = null) => {
        setAlert({ message, type, callback });
    };

    const closeAlert = () => {
        const cb = alert?.callback;
        setAlert(null);
        if (cb) {
            // Delay callback execution slightly to allow visual transition of the alert closing
            setTimeout(() => {
                cb();
            }, 100);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && alert) {
                e.preventDefault();
                closeAlert();
            }
        };

        if (alert) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [alert]);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <div id="customAlertOverlay" className="custom-alert-overlay show">
                    <div className="custom-alert-card">
                        <span className={`custom-alert-icon ${alert.type}`}>
                            {alert.type === 'success' ? '✓' : '✕'}
                        </span>
                        <h3 className="custom-alert-title">
                            {alert.type === 'success' ? 'Success' : 'Login Failed'}
                        </h3>
                        <p className="custom-alert-message">{alert.message}</p>
                        <button
                            id="customAlertBtn"
                            className={`custom-alert-btn ${alert.type}`}
                            onClick={closeAlert}
                        >
                            {alert.type === 'success' ? 'Proceed' : 'Try Again'}
                        </button>
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
