import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-surface-300 mx-auto" />
        </motion.div>
        <h1 className="mt-6 text-4xl font-heading font-bold text-surface-900">404</h1>
        <h2 className="mt-2 text-xl font-medium text-surface-700">Page Not Found</h2>
        <p className="mt-4 text-surface-600 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to managing your tasks.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Tasks
        </motion.button>
      </motion.div>
    </div>
  );
}

export default NotFound;