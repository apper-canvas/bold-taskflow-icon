import React from 'react';

const CategoryChip = ({ color, name, className = '' }) => {
    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
            />
            <span className="text-surface-600">
                {name}
            </span>
        </div>
    );
};

export default CategoryChip;