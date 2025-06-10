import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 py-2 w-64 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>
    );
};

export default SearchBar;