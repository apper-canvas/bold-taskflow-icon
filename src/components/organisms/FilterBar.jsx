import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const statusFilters = [
    { key: 'all', label: 'All', icon: 'List' },
    { key: 'pending', label: 'Pending', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle' }
];

const FilterBar = ({ statusFilter, onStatusFilterChange, selectedTaskCount, onBulkDeleteClick }) => {
    return (
        <div className="flex-shrink-0 bg-surface-50 border-b border-surface-200 px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {/* Status Filter */}
                    <div className="flex bg-white rounded-lg p-1 border border-surface-200">
                        {statusFilters.map(filter => (
                            <Button
                                key={filter.key}
                                onClick={() => onStatusFilterChange(filter.key)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                                    statusFilter === filter.key
                                        ? 'bg-primary text-white'
                                        : 'text-surface-600 hover:bg-surface-100'
                                } bg-transparent`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ApperIcon name={filter.icon} className="w-3 h-3" />
                                <span>{filter.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Bulk Actions */}
                <AnimatePresence>
                    {selectedTaskCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center space-x-2"
                        >
                            <span className="text-sm text-surface-600">
                                {selectedTaskCount} selected
                            </span>
                            <Button
                                onClick={onBulkDeleteClick}
                                className="px-3 py-1.5 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90 transition-colors flex items-center space-x-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ApperIcon name="Trash2" className="w-3 h-3" />
                                <span>Delete</span>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FilterBar;