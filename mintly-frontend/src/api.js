import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expenses';

// Get all expenses
export const getAllExpenses = async () => {
  const response = await axios.get(API_URL);
  console.log("response==>",response.data);
  return response.data;
};

// Get expense by ID
export const getExpenseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add a new expense
export const addExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

// Update an existing expense
export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/${id}`, expense);
  return response.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};