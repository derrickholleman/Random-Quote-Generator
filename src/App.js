import { useState, useEffect } from "react";
import "./css/App.css";
import minus from "./images/minus.png";
import plus from "./images/plus.png";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quotesToDisplay, setQuotesToDisplay] = useState([]);
  const [amountOfQuotes, setAmountOfQuotes] = useState(1);

  useEffect(() => {
    async function getQuotes() {
      try {
        const quotesRes = await fetch("https://type.fit/api/quotes");
        const quotesJSON = await quotesRes.json();
        setQuotes(quotesJSON);
      } catch (err) {
        console.error(err);
      }
    }

    getQuotes();
  }, []);

  const handleGetQuotes = () => {
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

      <div className="quote-amount">Press the buttons to get 1-5 quotes!</div>

      {/* INCREMENT BUTTON */}
      <div className="quote-amount-select">
        <button
          className="decrement-btn"
          onClick={(e) =>
            setAmountOfQuotes((amountOfQuotes) => amountOfQuotes - 1)
          }
          disabled={amountOfQuotes === 1}
        >
          <img src={minus} alt="decrement" />
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
          <img src={plus} alt="increment" />
        </button>
      </div>

      {/* GET QUOTES BUTTON */}
      <button onClick={handleGetQuotes} className="get-inspired-btn">
        Get Inspired!
      </button>

      {quotesToDisplay.map((quote) => (
        <div className="quote-response">
          <p>"{quote.text}"</p>
          <p>{quote.author}</p>
        </div>
      ))}
      <footer style={{ marginTop: "5rem" }}>
        <small> &copy; Derrick Holleman</small>
      </footer>
    </div>
  );
}

export default App;
