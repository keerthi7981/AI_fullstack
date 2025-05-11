import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://localhost:3001/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setError('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🌱 Sustainability Advisor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your system design or tech decision..."
          rows={5}
          style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f4f4f4' }}>
          <h3>AI Sustainability Advice:</h3>
          <p>{response}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
