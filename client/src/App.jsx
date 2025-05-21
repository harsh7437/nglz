import { useState } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const firstValue = e.target.first.value;
    const secondValue = e.target.second.value;

    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstValue, secondValue })
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      setSuccess('Submission saved!');
      e.target.reset(); // Clear form
    } catch (err) {
      console.error(err);
      setError('Server error, will fix it soon.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first"
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="second"
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default App;
