import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', type = 'button', disabled = false, whileHover, whileTap, ...props }) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;