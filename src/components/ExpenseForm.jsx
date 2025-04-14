import { useState } from 'react';

function ExpenseForm({ addExpense }) {
  const initialFormState = {
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().slice(0, 10)
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Expense name is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Add the expense with parsed amount
      addExpense({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      
      // Reset form
      setFormData(initialFormState);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      
      <div className="form-group">
        <label htmlFor="name">Expense Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="What did you spend on?"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="How much did you spend?"
          step="0.01"
        />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Shopping">Shopping</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>
      
      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;