import React from 'react';
import Modal from '@/components/molecules/Modal';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

function BulkDeleteConfirmation({ count, onConfirm, onCancel }) {
  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title=""
      className="max-w-sm"
    >
        <div className="text-center">
          <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Trash2" className="w-6 h-6 text-error" />
          </div>

          <h3 className="text-lg font-heading font-semibold text-surface-900 mb-2">
            Delete {count} Task{count !== 1 ? 's' : ''}?
          </h3>

          <p className="text-surface-600 mb-6">
            This action cannot be undone. All selected tasks will be permanently deleted.
          </p>

          <div className="flex space-x-3">
            <Button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-surface-300 text-surface-700 rounded-lg font-medium hover:bg-surface-50 transition-colors bg-transparent"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-error text-white rounded-lg font-medium hover:bg-error/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Delete
            </Button>
          </div>
        </div>
    </Modal>
  );
}

export default BulkDeleteConfirmation;