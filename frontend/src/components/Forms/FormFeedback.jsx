import React from 'react';

const FormFeedback = ({ message, type }) => {
    if (!message) return null;
    return (
        <div className={`form-feedback ${type}`} style={{ display: 'block' }}>
            <span>{message}</span>
        </div>
    );
};

export default FormFeedback;
