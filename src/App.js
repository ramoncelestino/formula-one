import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState();
  const [inputFilled, setInputFilled] = useState('');
  const [search, setSearch] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://api-formula-1.p.rapidapi.com/drivers',
    params: {search: inputFilled},
    headers: {
      'X-RapidAPI-Key': '82cedb7c33mshab52deea125628dp1fc32cjsn35026e797e21',
      'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
    }
  };

  // O useEffect aqui vai ser executado se determinada ação ocorrer
  // No caso há um parâmetro que ele tem, que está na linha 32 entre colchetes,
  // Se esse parâmetro estiver vazio, o useEffect vai ser executado uma unica vez,
  // Quando o componente for renderizado, se estiver preenchido, vai executar a
  // cada vez que o estado do que for passado como parametro mudar
  useEffect(() => {
    axios.request(options)
    .then((result) => setData(result.data.response))
    .catch((error) => console.error(error))

    setSearch(false);
  }, [search])


  const handleSearch = () => {
    setSearch(true)
  }
  

  return (
    <div className="App">
      <input onChange={(e) => setInputFilled(e.target.value)}></input>
      <button onClick={handleSearch}>Search Driver</button>
      <div className="drivers">
      {data && data.map((driver) => (
          <div className="pilot-card">
            <h1>{driver.name}</h1>
            <img className="pilot-image" src={driver.image}></img>
          </div>
      ))}
      </div>
    </div>
  );
}

export default App;
