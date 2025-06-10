import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import MainFeature from '../components/MainFeature';
import TaskForm from '../components/TaskForm';
import BulkDeleteConfirmation from '../components/BulkDeleteConfirmation';
import { taskService, categoryService } from '../services';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
      setShowTaskForm(false);
      toast.success('Task created successfully');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.update(taskId, taskData);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === taskId ? updatedTask : task)
      );
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed,
        updatedAt: new Date().toISOString()
      });
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === taskId ? updatedTask : t)
      );
      
      if (!task.completed) {
        toast.success('Task completed! 🎉');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedTasks.map(taskId => taskService.delete(taskId)));
      setTasks(prevTasks => 
        prevTasks.filter(task => !selectedTasks.includes(task.id))
      );
      setSelectedTasks([]);
      setShowBulkDelete(false);
      toast.success(`${selectedTasks.length} tasks deleted successfully`);
    } catch (err) {
      toast.error('Failed to delete tasks');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.categoryId === selectedCategory;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (loading) {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar skeleton */}
          <aside className="w-64 bg-surface-50 p-6 overflow-y-auto">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-10 bg-surface-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </aside>
          
          {/* Main content skeleton */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Something went wrong</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <header className="flex-shrink-0 h-20 bg-white border-b border-surface-200 px-6 flex items-center justify-between z-40">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-heading font-semibold text-surface-900">TaskFlow</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowTaskForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>New Task</span>
          </motion.button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="flex-shrink-0 bg-surface-50 border-b border-surface-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <div className="flex bg-white rounded-lg p-1 border border-surface-200">
              {[
                { key: 'all', label: 'All', icon: 'List' },
                { key: 'pending', label: 'Pending', icon: 'Clock' },
                { key: 'completed', label: 'Completed', icon: 'CheckCircle' }
              ].map(filter => (
                <motion.button
                  key={filter.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStatusFilter(filter.key)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    statusFilter === filter.key
                      ? 'bg-primary text-white'
                      : 'text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  <ApperIcon name={filter.icon} className="w-3 h-3" />
                  <span>{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <AnimatePresence>
            {selectedTasks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-2"
              >
                <span className="text-sm text-surface-600">
                  {selectedTasks.length} selected
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBulkDelete(true)}
                  className="px-3 py-1.5 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90 transition-colors flex items-center space-x-1"
                >
                  <ApperIcon name="Trash2" className="w-3 h-3" />
                  <span>Delete</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Category Sidebar */}
        <aside className="w-64 bg-surface-50 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wide mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'text-surface-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <span>All Tasks</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === 'all' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-surface-200 text-surface-600'
                }`}>
                  {totalCount}
                </span>
              </motion.button>
              
              {categories.map(category => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'text-surface-700 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-surface-200 text-surface-600'
                  }`}>
                    {tasks.filter(task => task.categoryId === category.id).length}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <MainFeature
            tasks={filteredTasks}
            categories={categories}
            selectedTasks={selectedTasks}
            onTaskToggle={handleToggleTask}
            onTaskEdit={setEditingTask}
            onTaskDelete={handleDeleteTask}
            onTaskSelect={(taskId, selected) => {
              if (selected) {
                setSelectedTasks(prev => [...prev, taskId]);
              } else {
                setSelectedTasks(prev => prev.filter(id => id !== taskId));
              }
            }}
            onSelectAll={(selected) => {
              if (selected) {
                setSelectedTasks(filteredTasks.map(task => task.id));
              } else {
                setSelectedTasks([]);
              }
            }}
          />
        </main>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {(showTaskForm || editingTask) && (
          <TaskForm
            task={editingTask}
            categories={categories}
            onSubmit={editingTask ? 
              (data) => handleUpdateTask(editingTask.id, data) : 
              handleCreateTask
            }
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Bulk Delete Confirmation */}
      <AnimatePresence>
        {showBulkDelete && (
          <BulkDeleteConfirmation
            count={selectedTasks.length}
            onConfirm={handleBulkDelete}
            onCancel={() => setShowBulkDelete(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;