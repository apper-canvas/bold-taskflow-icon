import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import ApperIcon from './ApperIcon';

function MainFeature({ 
  tasks, 
  categories, 
  selectedTasks, 
  onTaskToggle, 
  onTaskEdit, 
  onTaskDelete, 
  onTaskSelect,
  onSelectAll 
}) {
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || '#94A3B8';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'Uncategorized';
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

  const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;
  const someSelected = selectedTasks.length > 0 && selectedTasks.length < tasks.length;

  if (tasks.length === 0) {
    return (
      <div className="p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="CheckSquare" className="w-20 h-20 text-surface-300 mx-auto" />
          </motion.div>
          <h3 className="mt-6 text-xl font-heading font-medium text-surface-900">
            No tasks yet
          </h3>
          <p className="mt-2 text-surface-600 max-w-sm mx-auto">
            Create your first task to start organizing your workflow and boost your productivity.
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-6"
          >
            <div className="inline-flex items-center space-x-2 text-sm text-accent">
              <ApperIcon name="ArrowUp" className="w-4 h-4" />
              <span>Click "New Task" to get started</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Select All Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectAll(!allSelected)}
            className="flex items-center space-x-2 text-sm text-surface-600 hover:text-surface-900"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={() => {}}
                className="custom-checkbox"
              />
            </div>
            <span>Select All</span>
          </motion.button>
        </div>
        
        <div className="text-sm text-surface-600">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task, index) => {
            const isSelected = selectedTasks.includes(task.id);
            const dueDate = formatDueDate(task.dueDate);
            
            return (
              <motion.div
                key={task.id}
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
                className={`bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-primary shadow-md' 
                    : 'border-transparent hover:shadow-md'
                } ${task.completed ? 'opacity-75' : ''}`}
                onClick={() => onTaskSelect(task.id, !isSelected)}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskToggle(task.id);
                    }}
                    className="mt-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {}}
                      className="custom-checkbox"
                    />
                  </motion.button>

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
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskEdit(task);
                          }}
                          className="p-1.5 text-surface-400 hover:text-primary rounded-md hover:bg-surface-50"
                        >
                          <ApperIcon name="Edit2" className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskDelete(task.id);
                          }}
                          className="p-1.5 text-surface-400 hover:text-error rounded-md hover:bg-surface-50"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Task Meta */}
                    <div className="flex items-center space-x-4 text-sm">
                      {/* Category */}
                      <div className="flex items-center space-x-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getCategoryColor(task.categoryId) }}
                        />
                        <span className="text-surface-600">
                          {getCategoryName(task.categoryId)}
                        </span>
                      </div>

                      {/* Priority */}
                      <div className={`flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
                        <ApperIcon name={getPriorityIcon(task.priority)} className="w-3 h-3" />
                        <span className="capitalize">{task.priority}</span>
                      </div>

                      {/* Due Date */}
                      {dueDate && (
                        <div className={`flex items-center space-x-1 ${dueDate.className}`}>
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <span>{dueDate.text}</span>
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
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MainFeature;