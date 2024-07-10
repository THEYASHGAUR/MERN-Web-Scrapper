import { useEffect, useState } from 'react';
import './App.css';
import Tables from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState('');

  const fetchData = () => {
    fetch('http://localhost:3001/api/scrape')
      .then(response => response.json())
      .then(data => {
        const date = new Date();
        const fetchTime = date.toLocaleString(); // Get current date and time
        setLastFetchTime(fetchTime);
        
        // Check if new data is different from current data
        if (JSON.stringify(data) !== JSON.stringify(data)) {
          showNotification(); // Show notification if data is updated
        }
        
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 1800000); // Fetch data every 30 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('New Data Fetched', {
        body: 'New data has been fetched from the website!',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New Data Fetched', {
            body: 'New data has been fetched from the website!',
          });
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Latest Updates from University</h1>
        <p>Last fetched: {lastFetchTime}</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <Tables title={item.title} href={item.href} />
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
