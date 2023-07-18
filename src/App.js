// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./components/News";

import StockRow from "./components/StockRow";
import StockChart from "./components/StockChart";

function App() {
  const [input, setInput] = useState("");
  const [tickers, setTickers] = useState([]);
  const [invalidTickers, setInvalidTickers] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value.toUpperCase());
  };

  const validateTicker = async (ticker) => {
    const response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_f85aa28ef32e45a3a228b7f6eccab5ef`
    );
    return response.ok;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    if (input === "DONE") {
      setInput("");
      return;
    }

    const isValid = await validateTicker(input);
    if (isValid) {
      setTickers([...tickers, input]);
      setInvalidTickers(invalidTickers.filter((t) => t !== input));
    } else {
      setInvalidTickers([...invalidTickers, input]);
    }

    setInput("");
  };

  return (
    <Router>
      <div className="App">
        <div className="container full-width">
          <Routes>
            <Route path="/news/:ticker" element={<News />} />
            <Route
              path="/"
              element={
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      {/* Wrap the input and button in a form element */}
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Enter ticker symbol"
                        />
                        <button type="submit">Submit</button>
                      </form>
                      {invalidTickers.length > 0 && (
                        <div className="invalid-tickers">
                          Invalid tickers: {invalidTickers.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <ul className="list-group list-group-flush">
                            {tickers.map((ticker) => (
                              <Link to={`/stock/${ticker}`} key={ticker}>
                                <StockRow ticker={ticker} />
                              </Link>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/stock/:ticker" element={<StockChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;