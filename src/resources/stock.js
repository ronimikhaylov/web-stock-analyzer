import { iex } from "../config/iex.js";

const observedHolidays = [
  new Date("2023-01-02"), // New Year's Day (observed)
  new Date("2023-01-16"), // Martin Luther King, Jr. Day
  new Date("2023-02-20"), // Washington's Birthday
  new Date("2023-04-07"), // Good Friday
  new Date("2023-05-29"), // Memorial Day
  new Date("2023-06-19"), // Juneteenth
  new Date("2023-07-04"), // Independence Day
  new Date("2023-09-04"), // Labor Day
  new Date("2023-11-23"), // Thanksgiving Day
  new Date("2023-12-25"), // Christmas Day
];
/**
 * function that checks if the date is a valid business day
 * @param  date 
 * @returns 
 */
function isValidBusinessDay(date) {
  let day = date.getDay();
  if (day === 0 || day === 6) { // 0 is Sunday, 6 is Saturday
    return false;
  }

  return true;
}

function isObservedHoliday(date) {
  for (let i = 0; i < observedHolidays.length; i++) {
    // console.log(" observed holiday..." + observedHolidays[i].getDay+1);
    // check the day ahead because when
    // the date was consoled out it was one day behind
    // console.log(" date..." + date);

    if (
      observedHolidays[i].getDate() + 1 === date.getDate() && //  +1 because when the date was consoled out it was one day behind
      observedHolidays[i].getMonth() === date.getMonth() &&
      observedHolidays[i].getFullYear() === date.getFullYear()
    ) {
      return true;
    }
  }
  return false;
}

function getPreviousBusinessDay() {
  let date = new Date();

  do {
    // Subtract 1 day
    date.setDate(date.getDate() - 1);
  } while (!isValidBusinessDay(date));

  // If the date is an observed holiday, keep subtracting
  console.log(
    "Checking if date is an observed holiday..." + isObservedHoliday(date)
  );
  if (isObservedHoliday(date)) {
    // Subtract 1 day
    date.setDate(date.getDate() - 1);
  }

  // Format the date as YYYYMMDD
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let dayOfMonth = ("0" + date.getDate()).slice(-2);
  console.log("Previous business day:", `${year}${month}${dayOfMonth}`);
  return `${year}${month}${dayOfMonth}`;
}
/**
 * const stock is an object that contains functions to fetch stock data from the IEX Cloud API
 */
export const stock = {
  // Fetches the latest price and previous business day's closing price
  fetchPrices: async (ticker, callback) => {
    const latestPriceData = await fetch(stock.latestPriceURL(ticker)).then((response) => response.json());
    const prevBusinessDay = getPreviousBusinessDay();
    const yesterdaysCloseData = await fetch(stock.yesterdaysCloseURL(ticker, prevBusinessDay)).then((response) => response.json());
    callback({
      latestPrice: stock.formatPriceData(latestPriceData),
      yesterdaysClose: stock.formatPriceData(yesterdaysCloseData)
    });
  },

  // formatPriceData takes the raw data from the API and returns an object with the price, date, and time
  formatPriceData: (data) => { // Q. where is this function called
    // A. It is called in the latestPrice function
    if (!data || data.length === 0) {
      return { price: null, date: null, time: null };
    }

    const stockData = data[data.length - 1];
    console.log("stockData:", stockData); // this is supposed to be the latest price
    const formattedData = {};
    formattedData.price = stockData.close;
    // if (stockData.close === null) {
    //   formattedData.price = stockData.marketClose;
    //   console.log("marketClose:", stockData.marketClose);
    // } else if (stockData.price !== null){
    //   formattedData.price = stockData.price;
    //}
    // if (stockData.close === null) {
    //   formattedData.price = stockData.close;
    //   console.log("marketClose:", stockData.close);
    // }
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;

    console.log("formattedData:", formattedData) // thi8s is the latest price after formatting
    return formattedData;
  },
 // getYesterdaysClose takes the ticker and date and returns the previous business day's closing price
  getYesterdaysClose: (ticker, date, callback) => { 
    fetch(stock.yesterdaysCloseURL(ticker, date))
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw data:", data); //
        callback(stock.formatPriceData(data)); // callback function is passed in from the component 
        // because the component is the one that needs to update the state
        

      });
  },

  
  latestPriceURL: (ticker) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },


  yesterdaysCloseURL: (ticker, date) => {
    return `${iex.base_url}/stock/${ticker}/chart/date/${date}?chartByDay=true&token=${iex.api_token}`;
  },
};

export { getPreviousBusinessDay };
export { isValidBusinessDay };
export { isObservedHoliday };