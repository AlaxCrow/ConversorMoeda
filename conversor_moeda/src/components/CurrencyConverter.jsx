import "./CurrencyConverter.css";
import { useState, useEffect} from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const[rates,setRates] = useState(null);
  const[fromCurrency, setFromCurrency] = useState("USD");
  const[toCurrency, setToCurrency] = useState ("EUR");
  const[amount, setAmount] = useState (1);
  const[convertedAmount, setConvertedAmount] =useState (null);

  useEffect(() =>{
    axios
    .get(
      "https://v6.exchangerate-api.com/v6/7969831ddaf0f3ff77868307/latest/USD"
    )
    .then((response) =>{
      setRates(response.data.conversion_rates);
    })
    .catch((error)=>{
      console.log("Ocorreu um erro", error);
    });
  }, []);

  useEffect(()=>{
    if(rates){
      const rateFrom = rates[fromCurrency] || 0
      const rateTo = rates[toCurrency] || 0
      setConvertedAmount(((amount / rateFrom) * rateTo).toFixed(2));
    }
  }, [amount, rates, fromCurrency, toCurrency])

    if(!rates) {
      return <h1>Carregando...</h1>
    }

  return (
  <body>
  <div className="converter">
    <h2>Conversor de moedas</h2>
    <img src="https://th.bing.com/th/id/R.22b84e3fb7e5f20cd83dcd68456a0d8e?rik=VagF1zYAi3u08Q&riu=http%3a%2f%2fstatic9.depositphotos.com%2f1035449%2f1106%2fv%2f950%2fdepositphotos_11065650-stock-illustration-vector-gold-money-dollar-coin.jpg&ehk=e4WbV9zkM50xO8v2L3YYsYvHOYXRJtwMfvsEV7%2fD7sE%3d&risl=&pid=ImgRaw&r=0"></img>
    <input type="number" placeholder="Digite o valor" value={amount}
    onChange={(e)=> setAmount(e.target.value)}
    />
    <span>Selecione a moeda</span>
    <select value={fromCurrency}
    onChange={(e)=> setFromCurrency(e.target.value)}
    >
    {Object.keys(rates).map((currency)=>(
      <option value={currency} key={currency}>
        {currency}
      </option>
    ))}
    </select>
    <span>Para</span>
    <select value={toCurrency}
    onChange={(e)=> setToCurrency(e.target.value)}
    >
    {Object.keys(rates).map((currency)=>(
      <option value={currency} key={currency}>
        {currency}
      </option>
    ))}
    </select>
    <h3>
      {convertedAmount} {toCurrency}
    </h3>
    <p>
      {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
    </p>
  
  </div>
  </body>
  );
};

export default CurrencyConverter