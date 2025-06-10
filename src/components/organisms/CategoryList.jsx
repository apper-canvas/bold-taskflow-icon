import React from 'react';
import { motion } from 'framer-motion';
import CategoryChip from '@/components/molecules/CategoryChip';
import Button from '@/components/atoms/Button';

const CategoryList = ({ categories, selectedCategory, onSelectCategory, totalTaskCount, tasks }) => {
    return (
        <aside className="w-64 bg-surface-50 overflow-y-auto">
            <div className="p-6">
                <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wide mb-4">
                    Categories
                </h3>
                <div className="space-y-2">
                    <Button
                        onClick={() => onSelectCategory('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                            selectedCategory === 'all'
                                ? 'bg-primary text-white'
                                : 'text-surface-700 hover:bg-white hover:shadow-sm'
                        } bg-transparent`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>All Tasks</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === 'all'
                                ? 'bg-white/20 text-white'
                                : 'bg-surface-200 text-surface-600'
                        }`}>
                            {totalTaskCount}
                        </span>
                    </Button>

                    {categories.map(category => (
                        <Button
                            key={category.id}
                            onClick={() => onSelectCategory(category.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                                selectedCategory === category.id
                                    ? 'bg-primary text-white'
                                    : 'text-surface-700 hover:bg-white hover:shadow-sm'
                            } bg-transparent`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <CategoryChip
                                color={category.color}
                                name={category.name}
                                className="!space-x-2"
                            />
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                selectedCategory === category.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-surface-200 text-surface-600'
                            }`}>
                                {tasks.filter(task => task.categoryId === category.id).length}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default CategoryList;