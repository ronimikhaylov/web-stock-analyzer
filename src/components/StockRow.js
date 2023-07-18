// Import necessary libraries and components
import React, { Component } from "react";
import { stock } from "../resources/stock.js";
import { Link } from "react-router-dom";
// Define the StockRow class component
class StockRow extends Component {
  constructor(props) {
    super(props);
    // Initialize the state with default values
    this.state = {
      price: null,
      date: null,
      time: null,
      dollar_change: null,
      percent_change: null,
    };
  }

  // Define a function to set the color and symbol of the price change display
  changeStyle() {
    return {
      color: this.state.dollar_change >= 0 ? "#4caf50" : "#e53935",
      fontSize: "0.8rem",
      marginLeft: 5,
      changeSymbol: this.state.dollar_change >= 0 ? "+" : "-",
    };
  }

  // Define a function to apply the fetched data to the state
  applyData(latestPrice, yesterdaysClose) {
    // Update the state with the latest price, date, and time
    this.setState({
      price: latestPrice.price,
      date: latestPrice.date,
      time: latestPrice.time,
    });

    // Calculate the dollar change and percentage change between today's price and yesterday's price
    const dollar_change = (latestPrice.price - yesterdaysClose.price).toFixed(
      2
    );
    const percent_change =
      (
        ((latestPrice.price - yesterdaysClose.price) / yesterdaysClose.price) *
        100
      ).toFixed(2) + "%";

    // Update the state with the calculated dollar change and percentage change
    this.setState({
      dollar_change: parseFloat(dollar_change), // Store the value as a number
      percent_change: "(" + percent_change + ")",
    });
  }

  // When the component mounts, fetch the latest stock price and apply the data
  componentDidMount() {
    stock.fetchPrices(this.props.ticker, ({ latestPrice, yesterdaysClose }) => {
      this.applyData(latestPrice, yesterdaysClose);
      
    });
  }

  // Render the StockRow component
  // Render the StockRow component
  render() {
    // Get the appropriate style for the price change display
    const changeStyleData = this.changeStyle();
    return (
      <li className="list-group-item">
        <b>{this.props.ticker}</b> ${this.state.price}
        <span
          className="change"
          style={{
            color: changeStyleData.color,
            fontSize: changeStyleData.fontSize,
            marginLeft: changeStyleData.marginLeft,
          }}
        >
          {changeStyleData.changeSymbol}${Math.abs(this.state.dollar_change)}
          &nbsp;{this.state.percent_change}
        </span>
        <Link to={`/news/${this.props.ticker}`}>
          <button className="btn btn-sm btn-outline-secondary float-right">
            View News for {this.props.ticker}
          </button>
        </Link>
      </li>
    );
  }
}

export default StockRow;
