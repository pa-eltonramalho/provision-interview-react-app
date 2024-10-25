import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: { padding: '10px', border: '2px solid black' },
  header: { color: 'blue' },
  button: { backgroundColor: 'green', color: 'white', padding: '5px 10px' },
  page: { backgroundColor: 'blue', color: 'white', padding: '5px 10px', marginRight: '15px' },
  options: { padding: '5px 10px', margin: '0 10px' },
};

const App = () => {
  const options = [5, 10, 15, 20];
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);
  const [page, setPage] = useState<any>(0);
  const [limit, setLimit] = useState<any>(10);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/posts?_page='+ page + '&_limit=' + limit)
      .then(response => {
        setData(response.data);
        setLoading(false);
      });
  }, [page, limit]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Posts App</h1>

      <div>
      <label htmlFor="recordsPerPage">Records per page:</label>
      <select
        id="recordsPerPage"
        style={styles.options}
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}

      { 
        //TODO: Implement current page display
      }

      <button style={styles.page}  onClick={() => setPage( Math.max(page - 1, 1))}>Previous</button>
      <button style={styles.page}  onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default App;
