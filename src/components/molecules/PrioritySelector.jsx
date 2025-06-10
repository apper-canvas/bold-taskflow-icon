import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-accent', icon: 'Minus' },
    { value: 'medium', label: 'Medium', color: 'text-warning', icon: 'Clock' },
    { value: 'high', label: 'High', color: 'text-error', icon: 'AlertCircle' }
];

const PrioritySelector = ({ selectedPriority, onChange }) => {
    return (
        <div className="grid grid-cols-3 gap-2">
            {priorityOptions.map(priority => (
                <Button
                    key={priority.value}
                    type="button"
                    onClick={() => onChange(priority.value)}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-1 ${
                        selectedPriority === priority.value
                            ? 'border-primary bg-primary/5'
                            : 'border-surface-200 hover:border-surface-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <ApperIcon
                        name={priority.icon}
                        className={`w-4 h-4 ${priority.color}`}
                    />
                    <span className="text-sm font-medium">{priority.label}</span>
                </Button>
            ))}
        </div>
    );
};

export default PrioritySelector;