# Stock Tracker Application

## Overview
The Stock Tracker is a React application that fetches and displays real-time stock prices, historical stock data, and related news articles using the IEX Cloud API and the OpenAI API. It allows users to track stock prices for multiple tickers, view the past month's price changes in a line chart, and read the latest news articles related to a particular stock.

This application leverages modern React practices such as Hooks, functional components, and the React Router library for routing. 

## Features

- Track real-time stock prices for multiple tickers
- View percentage and dollar changes compared to the previous trading day's closing price
- Visualize the past month's price changes in a line chart
- Read the latest news articles related to a particular stock using the OpenAI API
- Add and remove stocks from the tracking list
- Error handling for non-existent or invalid stock ticker symbols

## News Feature Using OpenAI API

The news articles related to a particular stock are fetched using OpenAI API. The articles returned by the API are summaries written by GPT-4, a state-of-the-art language model by OpenAI. Each news article includes a clickable headline and a brief summary.

This component fetches the news data when it is mounted or when the ticker prop changes. All API requests are handled in an asynchronous manner to provide a smooth user experience.

## Project Structure

1. `App.js`: The main component which holds the state of the user-inputted ticker and a list of valid tickers. The App component includes routing to different components using the React Router library.

2. `components/StockRow.js`: Renders a row for a particular stock ticker, showing the current price, the dollar change, and the percentage change compared to the previous trading day's closing price. When a stock row is mounted, it fetches the latest stock price and the previous day's closing price.

3. `components/StockChart.js`: Renders a line chart showing the past month's closing prices for a particular stock. The chart is created using the Recharts library. This component fetches the past month's daily price data when it is mounted or when the ticker prop changes.

4. `components/News.js`: Fetches and displays a list of the latest news articles related to a particular stock using the OpenAI API. Each news article includes a clickable headline and a summary. This component fetches the news data when it is mounted or when the ticker prop changes.

5. `resources/stock.js`: Contains functions for fetching stock data from the IEX Cloud API, as well as helper functions for formatting the API data and determining valid business days.

## Video Demo


Click the above image to see a video demonstration of the application. This video covers all the major features of the application, including tracking real-time stock prices, visualizing historical data, and fetching the latest news articles related to a particular stock.

## Getting Started

1. Clone this repository
2. Run `npm install` to install all necessary dependencies
3. Add your IEX Cloud API token to the `iex.js` file in the config folder
4. Run `npm start` to start the application

## Dependencies
- React
- Axios
- React Router DOM
- Recharts
- Bootstrap
- OpenAI

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
