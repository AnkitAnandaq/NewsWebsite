import { useState, useEffect } from "react";
import NewsPage from "./NewsPage";

const NewsBlocks = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=5e646a81f2374d60888bfadafdaceb91`;

      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Set articles only if there are articles in the response
        if (data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div>
      <h1 className="text-center my-1">
        Latest <span className="badge bg-danger py-1 px-2">News</span>
      </h1>
      {loading ? (
        <div className="text-center">Loading articles...</div>
      ) : (
        <div
          className="d-flex flex-wrap gap-5 justify-content-center"
          style={{ width: "100%", overflowX: "auto" }}
        >
          {articles.map((news) => {
            // Only render the NewsPage if title and image source are available
            if (news.urlToImage) {
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
            return null; // Render nothing if the article doesn't have a title or image
          })}
        </div>
      )}
    </div>
  );
};

export default NewsBlocks;
