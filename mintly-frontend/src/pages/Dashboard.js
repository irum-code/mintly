import React, { useState, useEffect } from 'react';
import { getAllExpenses } from '../api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getLogScale = (value) => {
  // Adding 1 to avoid log(0), multiply by scaling factor for better visibility
  return Math.log10(value + 1) * 50;
};

const Dashboard = () => {
  const today = new Date();
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses();
        setExpenses(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  // Filter expenses from the last 30 days
  const lastMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const diffTime = Math.abs(today - expenseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  });

  // Aggregate expenses by category for the bar chart
  const expensesByCategory = lastMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Prepare data for the bar chart with log scale
  const barChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Expenses by Category (Last 30 Days)',
        data: Object.values(expensesByCategory).map(getLogScale),
        backgroundColor: [
          '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#E91E63',
          '#FF5722', '#607D8B', '#795548', '#009688', '#3F51B5'
        ],
        borderColor: '#333',
        borderWidth: 1,
      },
    ],
  };

  // Set options for the bar chart with tooltips showing actual values
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const actualValue = Object.values(expensesByCategory)[context.dataIndex];
            return `$${actualValue.toFixed(2)}`;
          }
        }
      }
    },
  };

  // Sort aggregated category expenses in descending order
  const sortedExpensesByCategory = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]);

  // Category colors for each category bar
  const categoryColors = {
    'Food & Groceries': 'bg-green-500',
    'Travel & Transportation': 'bg-blue-500',
    'Utilities': 'bg-yellow-500',
    'Entertainment': 'bg-purple-500',
    'Healthcare': 'bg-pink-500',
    'Rent/Mortgage': 'bg-red-500',
    'Insurance': 'bg-indigo-500',
    'Education': 'bg-orange-500',
    'Shopping': 'bg-teal-500',
    'Miscellaneous': 'bg-gray-500',
  };

  // Calculate maximum expense for relative width calculations
  const maxExpense = Math.max(...Object.values(expensesByCategory));

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Dashboard</h1>

      {/* Most Recent Expense */}
      {expenses.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 mb-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Most Recent Expense</h2>
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-gray-600 text-sm">Category:</p>
              <p className="text-blue-600 font-semibold">{expenses[expenses.length - 1].category}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Date:</p>
              <p className="text-blue-600 font-semibold">{expenses[expenses.length - 1].date}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Amount:</p>
              <p className="text-blue-600 font-semibold">${expenses[expenses.length - 1].amount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Expenses by Category for Last Month */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Expenses by Category (Last 30 Days)</h2>
        <div style={{ height: '300px' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Summed Expenses by Category */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Summed Expenses by Category</h2>

        {sortedExpensesByCategory.map(([category, total]) => (
          <div key={category} className="flex items-center mb-3">
            {/* Category Label */}
            <span className="w-1/5 text-gray-600 text-sm">{category}</span>

            {/* Fixed-width container for bar alignment */}
            <div className="flex-1 bg-gray-200 h-6 rounded-full overflow-hidden">
              {/* Colored Bar with Relative Width using log scale */}
              <div
                className={`${categoryColors[category] || 'bg-gray-400'} h-6 rounded-full`}
                style={{ 
                  width: `${(getLogScale(total) / getLogScale(maxExpense)) * 100}%` 
                }}
              ></div>
            </div>

            {/* Total Amount Label */}
            <span className="ml-4 text-gray-600 text-sm">${total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;