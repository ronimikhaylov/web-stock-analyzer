// News.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const News = () => {

  const { ticker } = useParams();
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/10?token=pk_f85aa28ef32e45a3a228b7f6eccab5ef`
        );

        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [ticker]);

  return (
    <div className="container">
      <h2>News for {ticker}</h2>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul>
          {news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.headline}
              </a>
              <p>{article.summary}</p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default News;
