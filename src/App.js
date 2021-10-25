import { useState, useEffect } from "react";
import "./css/App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quotesToDisplay, setQuotesToDisplay] = useState([]);
  const [amountOfQuotes, setAmountOfQuotes] = useState(0);

  useEffect(() => {
    async function getQuotes() {
      const quotesRes = await fetch("https://type.fit/api/quotes");
      const quotesJSON = await quotesRes.json();
      setQuotes(quotesJSON);
    }

    getQuotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let quotesArray = [];
    for (let i = 1; i <= amountOfQuotes; i++) {
      let result = Math.floor(Math.random() * quotes.length + 1);
      quotesArray.push(quotes[result]);
      setQuotesToDisplay(quotesArray);
    }
  };

  return (
    <div className="App">
      <h1>~ Inspirational Quotes ~</h1>

      <form className="quote-amount-input" onSubmit={handleSubmit}>
        <label for="quote-amount" className="quote-amount">
          How many quotes do you want?
        </label>
        <input
          type="number"
          id="quote-amount"
          min="1"
          max="5"
          placeholder="1-5"
          required
          // if state is going to be empty at first - (0) or (''), don't need to specify a value
          onChange={(e) => setAmountOfQuotes(e.target.value)}
        />
        <button type="submit">Get Inspired!</button>
      </form>

      {quotesToDisplay.map((quote) => (
        <div className="quote-response">
          <p>"{quote.text}"</p>
          <p>{quote.author}</p>
        </div>
      ))}

      <small> &copy; Derrick Holleman</small>
    </div>
  );
}

export default App;
