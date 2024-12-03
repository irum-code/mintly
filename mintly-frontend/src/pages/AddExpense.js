import React, { useState } from 'react';
import { addExpense } from '../api'; // Assuming addExpense is an API function that posts the expense to the backend

const AddExpense = ({ onAddExpense }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Example categories
  const categories = [
    'Food & Groceries', 'Travel & Transportation', 'Utilities',
    'Entertainment', 'Healthcare', 'Rent/Mortgage', 'Insurance',
    'Education', 'Shopping', 'Miscellaneous'
  ];

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (category && amount && date) {
      const newExpense = { category, amount: parseFloat(amount), date };

      try {
        // Send new expense to the backend
        await addExpense(newExpense);

        // Update the expense list in the parent component
        if (onAddExpense) {
          onAddExpense(); // Trigger the callback to refresh expenses
        }
        // Show success message
        setShowSuccess(true);

        // Clear form fields
        setCategory('');
        setAmount('');
        setDate('');

        // Hide success message after a delay
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Add Expense</h1>
      
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a New Expense</h2>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-3 text-green-800 bg-green-200 rounded-lg">
            Expense added successfully!
          </div>
        )}

        <form onSubmit={handleAddExpense}>
          {/* Category */}
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Amount */}
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
          />

          {/* Date */}
          <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
