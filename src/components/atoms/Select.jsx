import React from 'react';

const Select = ({ value, onChange, options, className = '', placeholderOption = 'Select...', ...props }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${className}`}
            {...props}
        >
            {placeholderOption && <option value="">{placeholderOption}</option>}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;