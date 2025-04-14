function ExpenseTable({ expenses, deleteExpense }) {
    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };
  
    // Format date
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };
  
    return (
      <div className="expense-table-container">
        <h2>Your Expenses</h2>
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses found. Add an expense or try a different search term.</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.category}</td>
                  <td className="amount">{formatCurrency(expense.amount)}</td>
                  <td>{formatDate(expense.date)}</td>
                  <td>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteExpense(expense.id)}
                      aria-label={`Delete ${expense.name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total</td>
                <td className="total-amount">
                  {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
                </td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    );
  }
  
  export default ExpenseTable;