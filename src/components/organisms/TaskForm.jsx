import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Modal from '@/components/molecules/Modal';
import FormField from '@/components/molecules/FormField';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

function TaskForm({ task, categories, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        priority: 'medium',
        dueDate: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                categoryId: task.categoryId || '',
                priority: task.priority || 'medium',
                dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''
            });
        } else {
            setFormData({
                title: '',
                categoryId: '',
                priority: 'medium',
                dueDate: ''
            });
        }
        setErrors({});
    }, [task]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const submitData = {
                ...formData,
                title: formData.title.trim(),
                dueDate: formData.dueDate || null,
                updatedAt: new Date().toISOString()
            };

            if (!task) {
                submitData.completed = false;
                submitData.createdAt = new Date().toISOString();
            }

            await onSubmit(submitData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const categoryOptions = categories.map(cat => ({
        value: cat.id,
        label: cat.name
    }));

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title={task ? 'Edit Task' : 'Create New Task'}
            className="max-w-md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <FormField label="Task Title" required error={errors.title}>
                    <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Enter task title..."
                        className={errors.title ? 'border-error' : 'border-surface-300'}
                        autoFocus
                    />
                </FormField>

                {/* Category */}
                <FormField label="Category" required error={errors.categoryId}>
                    <Select
                        value={formData.categoryId}
                        onChange={(e) => handleChange('categoryId', e.target.value)}
                        options={categoryOptions}
                        placeholderOption="Select a category"
                        className={errors.categoryId ? 'border-error' : 'border-surface-300'}
                    />
                </FormField>

                {/* Priority */}
                <FormField label="Priority">
                    <PrioritySelector
                        selectedPriority={formData.priority}
                        onChange={(value) => handleChange('priority', value)}
                    />
                </FormField>

                {/* Due Date */}
                <FormField label="Due Date">
                    <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                        className="border-surface-300"
                    />
                </FormField>

                {/* Actions */}
                <div className="flex space-x-3 pt-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-surface-300 text-surface-700 rounded-lg font-medium hover:bg-surface-50 transition-colors bg-transparent"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <span>{task ? 'Update Task' : 'Create Task'}</span>
                        )}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

export default TaskForm;