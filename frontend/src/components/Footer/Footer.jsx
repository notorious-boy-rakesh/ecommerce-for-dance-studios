import React from 'react';

const Footer = ({ extraText }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {extraText && <p>{extraText}</p>}
            <p style={extraText ? { marginTop: '8px' } : {}}>
                &copy; {currentYear} <span>Dance School Management System</span>. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
