import { useState, useEffect } from "react";
import NewsPage from "./NewsPage";

const NewsBlocks = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null); // Reset error before new fetch
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=5e646a81f2374d60888bfadafdaceb91`;

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchArticles();
    } else {
      setError("Invalid category. Please provide a valid category.");
      setLoading(false);
    }
  }, [category]);

  return (
    <div>
      <h1 className="text-center my-1">
        Latest <span className="badge bg-danger py-1 px-2">News</span>
      </h1>

      {loading ? (
        <div className="text-center">Loading articles...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center">No articles available.</div>
      ) : (
        <div
          className="d-flex flex-wrap gap-5 justify-content-center"
          style={{ width: "100%", overflowX: "auto" }}
        >
          {articles.map((news) => {
            // Only render NewsPage if title and image are available
            if (news.title && news.urlToImage) {
              return (
                <NewsPage
                  key={news.url}
                  title={news.title}
                  src={news.urlToImage}
                  description={news.description}
                  url={news.url}
                />
              );
            }
            return null; // Skip articles without title or image
          })}
        </div>
      )}
    </div>
  );
};

export default NewsBlocks;
