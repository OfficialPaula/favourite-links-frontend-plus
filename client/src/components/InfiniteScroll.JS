import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InfiniteScroll = () => {
  // State variables
  const [items, setItems] = useState([]); // Holds the data
  const [isLoading, setIsLoading] = useState(false); // Indicates if data is being loaded
  const [error, setError] = useState(null); // Holds error message, if any
  const [allDataLoaded, setAllDataLoaded] = useState(false); // Indicates if all data has been loaded

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch more data
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false'
      );
      const newData = response.data;

      // Check if all data has been loaded
      if (newData.length === 0) {
        setAllDataLoaded(true);
        setIsLoading(false);
        return;
      }

      setItems(prevItems => [...prevItems, ...newData]);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  // Handle scroll event
  const handleScroll = () => {
    if (allDataLoaded || isLoading) {
      return;
    }

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollPosition >= documentHeight - 200) {
      fetchData();
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add scroll event listener when the component mounts and remove it when unmounted
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, allDataLoaded]);

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {allDataLoaded && (
        <button onClick={scrollToTop}>Back to Top</button>
      )}
    </div>
  );
};

export default InfiniteScroll;
