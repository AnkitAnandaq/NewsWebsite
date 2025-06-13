import { useState, useEffect } from "react";
import NewsPage from "../Components/NewsPage";

// Debounce function to limit the rate of API calls
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// eslint-disable-next-line react/prop-types
const NewsBlocks = ({ category }) => {
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const fetchNewsData = async (retryCount = 0) => {
    try {
      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_55821f5a5a1037155ec736418a8ac8ff2f44d&q=india&language=en&category=${category}`
      );

      if (response.ok) {
        const data = await response.json();
        setNewsData(data);
      } else if (response.status === 429) {
        // Handle 429 Too Many Requests error
        if (retryCount < 3) {
          setTimeout(() => fetchNewsData(retryCount + 1), 2000); // Retry after 2 seconds
        } else {
          setError("Too many requests. Please try again later.");
        }
      } else {
        setError(`Failed to fetch data: ${response.status}`);
      }
    } catch (error) {
      setError("Error occurred while fetching data");
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  // Debounced version of fetchNewsData with a 2-second delay
  const debouncedFetchNewsData = debounce(fetchNewsData, 2000);

  useEffect(() => {
    // Trigger debounced fetch on component mount
    debouncedFetchNewsData();
  }, [category]); // Only run on mount

  return (
    <div className="flex">
      <h1 className="text-center my-1">
        Latest <span className="badge bg-danger py-1 px-2">News</span>
      </h1>
      {error && <p>{error}</p>}
      <div
        className="d-flex flex-wrap gap-5 justify-content-center"
        style={{ width: "100%", overflowX: "auto" }}
      >
        {loading ? (
          <p>Loading news...</p>
        ) : newsData && newsData.results.length > 0 ? (
          newsData.results
            .filter((newsItem) => newsItem.image_url) // Filter for items with an image
            .map((newsItem) => (
              <NewsPage
                key={newsItem.link} // Use a unique key if available
                image={newsItem.image_url}
                title={newsItem.title}
                url={newsItem.link}
              />
            ))
        ) : (
          <p>No news available.</p> // Handle case where there are no news items
        )}
      </div>
    </div>
  );
};

export default NewsBlocks;
