import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '@/services';
import Header from '@/components/organisms/Header';
import FilterBar from '@/components/organisms/FilterBar';
import CategoryList from '@/components/organisms/CategoryList';
import TaskList from '@/components/organisms/TaskList';
import TaskForm from '@/components/organisms/TaskForm';
import BulkDeleteConfirmation from '@/components/organisms/BulkDeleteConfirmation';
import EmptyStateMessage from '@/components/organisms/EmptyStateMessage';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';
import abcd from '../components/abcd'

function HomePage() {
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
      setShowTaskForm(false);
      toast.success('Task updated successfully');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
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
        <EmptyStateMessage
          iconName="AlertCircle"
          title="Something went wrong"
          message={error}
          actionButtonText="Try Again"
          onActionButtonClick={loadData}
          className="px-6"
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        completedCount={completedCount}
        totalCount={totalCount}
        onNewTaskClick={() => setShowTaskForm(true)}
      />

      <FilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedTaskCount={selectedTasks.length}
        onBulkDeleteClick={() => setShowBulkDelete(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalTaskCount={totalCount}
          tasks={tasks}
        />

        <main className="flex-1 overflow-y-auto">
          <TaskList
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

export default HomePage;
