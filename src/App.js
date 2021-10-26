import { useState, useEffect } from "react";
import "./css/App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quotesToDisplay, setQuotesToDisplay] = useState([]);
  const [amountOfQuotes, setAmountOfQuotes] = useState(1);

  useEffect(() => {
    async function getQuotes() {
      const quotesRes = await fetch("https://type.fit/api/quotes");
      const quotesJSON = await quotesRes.json();
      setQuotes(quotesJSON);
    }

    getQuotes();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let quotesArray = [];
  //   // get n amount of random quotes
  //   for (let i = 1; i <= amountOfQuotes; i++) {
  //     let result = Math.floor(Math.random() * quotes.length + 1);
  //     quotesArray.push(quotes[result]);
  //     setQuotesToDisplay(quotesArray);
  //   }
  // };

  const getQuotes = () => {
    let quotesArray = [];
    // get n amount of random quotes
    for (let i = 1; i <= amountOfQuotes; i++) {
      let result = Math.floor(Math.random() * quotes.length + 1);
      quotesArray.push(quotes[result]);
      setQuotesToDisplay(quotesArray);
    }
  };

  return (
    <div className="App">
      <h1>Inspirational Quotes</h1>

      <div htmlFor="quote-amount" className="quote-amount">
        How many quotes do you want?
      </div>

      {/* INCREMENT BUTTON */}
      <div className="quote-amount-select">
        <button
          className="decrement-btn"
          onClick={(e) =>
            setAmountOfQuotes((amountOfQuotes) => amountOfQuotes - 1)
          }
          disabled={amountOfQuotes === 1}
        >
          -
        </button>
          
        <div className="quote-number">{amountOfQuotes}</div>

        {/* DECREMENT BUTTON */}
        <button
          className="increment-btn"
          onClick={(e) =>
            setAmountOfQuotes((amountOfQuotes) => amountOfQuotes + 1)
          }
          disabled={amountOfQuotes === 5}
        >
          +
        </button>
      </div>

      <button onClick={getQuotes}>Get Inspired!</button>

      {quotesToDisplay.map((quote) => (
        <div className="quote-response">
          <p>"{quote.text}"</p>
          <p>{quote.author}</p>
        </div>
      ))}
      <div style={{ marginTop: "5rem" }}>
        <small> &copy; Derrick Holleman</small>
      </div>
    </div>
  );
}

export default App;
