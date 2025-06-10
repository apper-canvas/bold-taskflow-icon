import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FormField = ({ label, children, error, required = false, className = '' }) => {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-surface-700 mb-2">
                {label} {required && '*'}
            </label>
            {children}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-error"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FormField;