import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import CategoryChip from '@/components/molecules/CategoryChip';

const getPriorityIcon = (priority) => {
    switch (priority) {
        case 'high': return 'AlertCircle';
        case 'medium': return 'Clock';
        case 'low': return 'Minus';
        default: return 'Minus';
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high': return 'text-error';
        case 'medium': return 'text-warning';
        case 'low': return 'text-accent';
        default: return 'text-surface-400';
    }
};

const formatDueDate = (dueDateString) => {
    if (!dueDateString) return null;

    const dueDate = parseISO(dueDateString);

    if (isToday(dueDate)) {
        return { text: 'Today', className: 'text-warning' };
    } else if (isTomorrow(dueDate)) {
        return { text: 'Tomorrow', className: 'text-info' };
    } else if (isPast(dueDate)) {
        return { text: 'Overdue', className: 'text-error' };
    } else {
        return { text: format(dueDate, 'MMM d'), className: 'text-surface-600' };
    }
};

const TaskCard = ({ task, categories, isSelected, onToggle, onEdit, onDelete, onSelect, index }) => {
    const getCategoryColor = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category?.color || '#94A3B8'; // Default grey
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category?.name || 'Uncategorized';
    };

    const dueDateInfo = formatDueDate(task.dueDate);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: task.completed ? 0.98 : 1
            }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
                duration: 0.2,
                delay: index * 0.05,
                layout: { duration: 0.3 }
            }}
            whileHover={{
                y: -2,
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
            }}
            className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer group ${
                isSelected
                    ? 'border-primary shadow-md'
                    : 'border-transparent hover:shadow-md'
            } ${task.completed ? 'opacity-75' : ''}`}
            onClick={() => onSelect(task.id, !isSelected)}
        >
            <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <Button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(task.id);
                    }}
                    className="mt-0.5 p-0 bg-transparent hover:bg-transparent"
                >
                    <Checkbox
                        checked={task.completed}
                        onChange={() => {}}
                    />
                </Button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-medium text-surface-900 break-words ${
                            task.completed ? 'line-through text-surface-500' : ''
                        }`}>
                            {task.title}
                        </h3>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                                className="p-1.5 text-surface-400 hover:text-primary rounded-md hover:bg-surface-50 bg-transparent"
                            >
                                <ApperIcon name="Edit2" className="w-4 h-4" />
                            </Button>

                            <Button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="p-1.5 text-surface-400 hover:text-error rounded-md hover:bg-surface-50 bg-transparent"
                            >
                                <ApperIcon name="Trash2" className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Task Meta */}
                    <div className="flex items-center space-x-4 text-sm">
                        {/* Category */}
                        <CategoryChip
                            color={getCategoryColor(task.categoryId)}
                            name={getCategoryName(task.categoryId)}
                        />

                        {/* Priority */}
                        <div className={`flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
                            <ApperIcon name={getPriorityIcon(task.priority)} className="w-3 h-3" />
                            <span className="capitalize">{task.priority}</span>
                        </div>

                        {/* Due Date */}
                        {dueDateInfo && (
                            <div className={`flex items-center space-x-1 ${dueDateInfo.className}`}>
                                <ApperIcon name="Calendar" className="w-3 h-3" />
                                <span>{dueDateInfo.text}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Selection Indicator */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="text-primary"
                        >
                            <ApperIcon name="CheckCircle" className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TaskCard;