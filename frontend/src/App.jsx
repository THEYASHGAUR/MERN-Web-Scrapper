import { useEffect, useState } from 'react';
import './App.css';
import DessertTable from './components/DesertTable';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState('');

  const fetchData = () => {
    fetch('https://web-scrapper-2.onrender.com/api/scrape')
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
        <h1 className='text-blue-600'>Latest Updates from IP University</h1>
        <p>Last fetched: {lastFetchTime}</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            <h2 className='font-bold text-3xl m-5'>Examination Notices</h2>
            {data.map((item, index) => (
              <li key={index}>

                <DessertTable title={item.title} href={item.href} />

              </li>
            ))}
          </ul>
          // <Table2 />
        )}
      </header>
      <footer className='m-10'>
        <a className='bg-gray-300 p-4 mt-20' target='_blank' href="https://github.com/THEYASHGAUR/MERN-Web-Scrapper">Github Link</a>
      </footer>
    </div>
  );
}

export default App;
