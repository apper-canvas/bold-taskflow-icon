import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${className}`}
            {...props}
        />
    );
};

export default Input;