// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Define the StockChart component
const StockChart = () => {
  // Extract the stock ticker symbol from the URL parameters
  const { ticker } = useParams();

  // Declare and initialize the chart data state using the useState hook
  const [chartData, setChartData] = useState([]);

  // Use the useEffect hook to fetch the chart data when the component mounts or the ticker changes
  useEffect(() => {
    // Define an async function to fetch the chart data
    const fetchChartData = async () => {
      // Fetch the stock chart data for the given ticker using the IEX API
      const response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1m?token=pk_f85aa28ef32e45a3a228b7f6eccab5ef`
      );
      // Parse the response as JSON
      const data = await response.json();

      // Update the chart data state with the fetched data, mapping it to the desired format
      setChartData(data.map((d) => ({ date: d.date, close: d.close })));
    };

    // Call the fetchChartData function
    fetchChartData();
  }, [ticker]); // The effect depends on the ticker value

  // Render the StockChart component
  return (
    <div className="container full-width">
      <h2>Stock Chart for {ticker}</h2>
      <LineChart
        // Set the chart width based on the window width
        width={window.innerWidth - 50}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default StockChart;
