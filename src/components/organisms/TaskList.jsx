import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import Checkbox from '@/components/atoms/Checkbox';
import EmptyStateMessage from '@/components/organisms/EmptyStateMessage';
import Button from '@/components/atoms/Button';

function TaskList({
    tasks,
    categories,
    selectedTasks,
    onTaskToggle,
    onTaskEdit,
    onTaskDelete,
    onTaskSelect,
    onSelectAll
}) {
    const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;
    const someSelected = selectedTasks.length > 0 && selectedTasks.length < tasks.length;

    if (tasks.length === 0) {
        return (
            <div className="p-6">
                <EmptyStateMessage
                    iconName="CheckSquare"
                    title="No tasks yet"
                    message="Create your first task to start organizing your workflow and boost your productivity."
                    showArrowHint={true}
                />
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Select All Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Button
                        onClick={() => onSelectAll(!allSelected)}
                        className="flex items-center space-x-2 text-sm text-surface-600 hover:text-surface-900 bg-transparent p-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <Checkbox
                                checked={allSelected}
                                indeterminate={someSelected}
                                onChange={() => {}}
                            />
                        </div>
                        <span>Select All</span>
                    </Button>
                </div>

                <div className="text-sm text-surface-600">
                    {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {tasks.map((task, index) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            categories={categories}
                            isSelected={selectedTasks.includes(task.id)}
                            onToggle={onTaskToggle}
                            onEdit={onTaskEdit}
                            onDelete={onTaskDelete}
                            onSelect={onTaskSelect}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default TaskList;