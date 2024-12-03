import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  getAllExpenses, 
  updateExpense, 
  deleteExpense 
} from '../api'; // Adjust this import to your API function

const History = () => {
  const [expenses, setExpenses] = useState([]); // Initialize as an empty array
  const [editId, setEditId] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;
  const categories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses();
        console.log('Sample expense full object:', JSON.stringify(data[0]));
        
        console.log('Fetched expenses:', data); // Debug log
        setExpenses(data || []);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setExpenses([]);
      }
    };
    fetchExpenses();
  }, []);

  const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy');

  const handleSort = (field) => {
    const sortedExpenses = [...expenses].sort((a, b) => {
      if (field === 'date') {
        return isAscending
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (field === 'category') {
        return isAscending
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      if (field === 'amount') {
        return isAscending ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });
    setExpenses(sortedExpenses);
    setSortBy(field);
    setIsAscending(!isAscending);
  };

  const toggleEdit = (id) => {
    console.log('Toggling edit for ID:', id); // Debug log
    console.log('Current editId:', editId); // Debug log
    
    setEditId(id);
  }

  const handleFieldChange = (id, field, value) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const saveEdit = async () => {
    try {
      const expenseToUpdate = expenses.find(exp => exp.id === editId);
      const updatedExpense = await updateExpense(editId, expenseToUpdate);
      
      // Update just the one expense in local state
      setExpenses(prevExpenses => 
        prevExpenses.map(expense => 
          expense.id === editId ? updatedExpense : expense
        )
      );
      
      setEditId(null);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      
      // First calculate if we need to change page
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      const newTotalPages = Math.ceil(updatedExpenses.length / itemsPerPage);
      
      // If deleting last item of current page (except page 1)
      if (currentPage > 1 && currentPage > newTotalPages) {
        setCurrentPage(currentPage - 1);
      }
      
      // Update expenses
      setExpenses(updatedExpenses);
      
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  

  const nextPage = () => {
    if (currentPage < Math.ceil(expenses.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedExpenses = expenses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Expense History</h1>

      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-0">
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white">
            <thead>
              <tr>
                <th onClick={() => handleSort('date')} className="px-4 py-2 text-left cursor-pointer">
                  <span className="inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-md">
                    Date {sortBy === 'date' ? (isAscending ? '▲' : '▼') : ''}
                  </span>
                </th>
                <th onClick={() => handleSort('category')} className="px-4 py-2 text-left cursor-pointer">
                  <span className="inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-md">
                    Category {sortBy === 'category' ? (isAscending ? '▲' : '▼') : ''}
                  </span>
                </th>
                <th onClick={() => handleSort('amount')} className="px-4 py-2 text-left cursor-pointer">
                  <span className="inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-md">
                    Amount {sortBy === 'amount' ? (isAscending ? '▲' : '▼') : ''}
                  </span>
                </th>
                <th className="px-4 py-2 text-left">
                  <span className="inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 ease-in-out shadow-md">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedExpenses.map((expense) => (
                <tr key={expense.id} className="bg-blue-50 hover:bg-blue-100">
                  <td className="px-4 py-2 text-gray-700">
                    {editId === expense.id ? (
                      <input
                        type="date"
                        value={expense.date}
                        onChange={(e) => handleFieldChange(expense.id, 'date', e.target.value)}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      formatDate(expense.date)
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {editId === expense.id ? (
                      <select
                        value={expense.category}
                        onChange={(e) => handleFieldChange(expense.id, 'category', e.target.value)}
                        className="border rounded p-1 w-full"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    ) : (
                      expense.category
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {editId === expense.id ? (
                      <input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => handleFieldChange(expense.id, 'amount', e.target.value)}
                        className="border rounded p-1 w-full text-right"
                      />
                    ) : (
                      `$${expense.amount}`
                    )}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {editId === expense.id ? (
                      <button onClick={saveEdit} className="text-green-500 hover:text-green-700 mr-2">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => toggleEdit(expense.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex-1 flex justify-start">
            {currentPage > 1 && (
              <button onClick={prevPage} className="px-4 py-2 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                Previous
              </button>
            )}
          </div>

          <span className="text-gray-700 font-semibold mx-4">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex-1 flex justify-end">
            {currentPage < totalPages && (
              <button onClick={nextPage} className="px-4 py-2 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;