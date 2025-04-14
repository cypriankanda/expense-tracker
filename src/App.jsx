import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import './App.css';

function App() {
  // Sample initial expenses
  const initialExpenses = [
    { id: 1, name: 'Groceries', amount: 85.75, category: 'Food', date: '2025-04-10' },
    { id: 2, name: 'Movie Tickets', amount: 24.99, category: 'Entertainment', date: '2025-04-08' },
    { id: 3, name: 'Gas', amount: 45.50, category: 'Transportation', date: '2025-04-12' },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [filteredExpenses, setFilteredExpenses] = useState(initialExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Add new expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1
    };
    setExpenses([...expenses, newExpense]);
  };

  // Delete expense
  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  // Search functionality
  useEffect(() => {
    const results = expenses.filter(expense => 
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpenses(results);
  }, [searchTerm, expenses]);

  // Sort functionality
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig.key) {
      const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredExpenses(sortedExpenses);
    }
  }, [sortConfig, expenses]);

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <div className="main-content">
        <div className="left-panel">
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="right-panel">
          <div className="controls">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <SortControls handleSort={handleSort} sortConfig={sortConfig} />
          </div>
          <ExpenseTable expenses={filteredExpenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;