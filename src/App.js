import './App.css';
import DriverList from './Components/DriverList';
import TeamsList from './Components/TeamList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

function App() {
  const [options, setOptions] = useState({
    method: 'GET',
    url: 'https://api-formula-1.p.rapidapi.com/drivers',
    params: {search: 'ham'},
    headers: {
      'X-RapidAPI-Key': '0e9cab5be1mshcfae3dc43f30f9bp188b61jsn8e2c8b3f816d',
      'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
    }
  })
  const [searchType, setSearchType] = useState('drivers');
  const [data, setData] = useState();
  const [inputFilled, setInputFilled] = useState('');
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setOptions(
      {
        method: 'GET',
        url: `https://api-formula-1.p.rapidapi.com/${searchType}`,
        params: {search: inputFilled},
        headers: {
          'X-RapidAPI-Key': '0e9cab5be1mshcfae3dc43f30f9bp188b61jsn8e2c8b3f816d',
          'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }
      }
    );
  }, [searchType])

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
    setSearch(true);
  }

  const handleSearchType = (e) => {
    setSearchType(e.target.value)
    setData();
  }

  console.log(searchType, search, data)
  return (
    <div className="App">
      <select name="search-type" onChange={handleSearchType}>
        <option value="drivers">drivers</option>
        <option value="teams">teams</option>
      </select>
      <div className='filter'>
        <input onChange={(e) => setInputFilled(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchType == 'drivers' && <DriverList Driver_Data= {data} />}
      {searchType == 'teams' && <TeamsList Team_Data= {data} />}
    </div>
  );
}

export default App;
