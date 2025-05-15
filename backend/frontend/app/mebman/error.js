// Auto-generated error component for mebman
'use client';

module.exports = function Error({ error, reset }) {
  return (
    <div className="error-container">
      <h2>mebman Error</h2>
      <p>{error.message}</p>
      <button 
        onClick={() => reset()}
        className="retry-button"
      >
        Try Again
      </button>
    </div>
  )
}