function SortControls({ handleSort, sortConfig }) {
    const getSortDirectionIndicator = (key) => {
      if (sortConfig.key === key) {
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
      }
      return '';
    };
  
    return (
      <div className="sort-controls">
        <span>Sort by:</span>
        <button 
          className={`sort-btn ${sortConfig.key === 'category' ? 'active' : ''}`} 
          onClick={() => handleSort('category')}
        >
          Category {getSortDirectionIndicator('category')}
        </button>
        <button 
          className={`sort-btn ${sortConfig.key === 'name' ? 'active' : ''}`} 
          onClick={() => handleSort('name')}
        >
          Name {getSortDirectionIndicator('name')}
        </button>
      </div>
    );
  }
  
  export default SortControls;