import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyStateMessage = ({
    iconName,
    title,
    message,
    actionButtonText,
    onActionButtonClick,
    showArrowHint = false,
    arrowHintText = 'Click "New Task" to get started',
    className = ''
}) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-center py-16 ${className}`}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
            >
                <ApperIcon name={iconName} className="w-20 h-20 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="mt-6 text-xl font-heading font-medium text-surface-900">
                {title}
            </h3>
            <p className="mt-2 text-surface-600 max-w-sm mx-auto">
                {message}
            </p>
            {actionButtonText && onActionButtonClick && (
                <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onActionButtonClick}
                    className="mt-8 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    {actionButtonText}
                </Button>
            )}
            {showArrowHint && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="mt-6"
                >
                    <div className="inline-flex items-center space-x-2 text-sm text-accent">
                        <ApperIcon name="ArrowUp" className="w-4 h-4" />
                        <span>{arrowHintText}</span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default EmptyStateMessage;