import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import { AuthContext } from '../../App';

const Header = ({ searchQuery, onSearchChange, completedCount, totalCount, onNewTaskClick }) => {
    const { logout } = useContext(AuthContext);

    return (
        <header className="flex-shrink-0 h-20 bg-white border-b border-surface-200 px-6 flex items-center justify-between z-40">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                        <ApperIcon name="CheckSquare" className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-xl font-heading font-semibold text-surface-900">TaskFlow</h1>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search tasks..."
                />
            </div>

            <div className="flex items-center space-x-4">
                {/* Progress Indicator */}
                <div className="flex items-center space-x-2 text-sm text-surface-600">
                    <span>{completedCount} of {totalCount} completed</span>
                    <div className="w-16 h-2 bg-surface-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-accent to-accent/80"
                        />
                    </div>
                </div>

                {/* New Task Button */}
                <Button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onNewTaskClick}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
                >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>New Task</span>
                </Button>

                {/* Logout Button */}
                <Button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    className="px-4 py-2 bg-surface-100 text-surface-700 rounded-lg font-medium hover:bg-surface-200 transition-colors flex items-center space-x-2"
                >
                    <ApperIcon name="LogOut" className="w-4 h-4" />
                    <span>Logout</span>
                </Button>
            </div>
        </header>
    );
};

export default Header;