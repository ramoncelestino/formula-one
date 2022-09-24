import './App.css';
import Modal from 'react-bootstrap/Modal';
import DriverList from './Components/DriverList';
import TeamsList from './Components/TeamList';
import DriverInfo from './Components/DriverInfo';
import TeamInfo from './Components/TeamInfo';
import Panel from './UI/Panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

function App() {
  const [options, setOptions] = useState({
    method: 'GET',
    url: 'https://api-formula-1.p.rapidapi.com/drivers',
    params: {search: ''},
    headers: {
      'X-RapidAPI-Key': '0e9cab5be1mshcfae3dc43f30f9bp188b61jsn8e2c8b3f816d',
      'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
    }
  })
  const [searchType, setSearchType] = useState('drivers');
  const [data, setData] = useState();
  const [driverInfo, setDriverInfo] = useState({});
  const [teamInfo, setTeamInfo] = useState({});
  const [cardClick, setCardClick] = useState(false);
  const [inputFilled, setInputFilled] = useState('');
  const [search, setSearch] = useState();
  
  useEffect(() => {
    setOptions(
      { method: 'GET',
        url: `https://api-formula-1.p.rapidapi.com/${searchType}`,
        params: {search: inputFilled},
        headers: {
          'X-RapidAPI-Key': '0e9cab5be1mshcfae3dc43f30f9bp188b61jsn8e2c8b3f816d',
          'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }
      }
    );
  }, [searchType, inputFilled])

  // O useEffect aqui vai ser executado se determinada ação ocorrer
  // No caso há um parâmetro que ele tem, que está na linha 32 entre colchetes,
  // Se esse parâmetro estiver vazio, o useEffect vai ser executado uma unica vez,
  // Quando o componente for renderizado, se estiver preenchido, vai executar a
  // cada vez que o estado do que for passado como parametro mudar
  useEffect(() => {
    console.log('requisição');
    axios.request(options)
    .then((result) => setData(result.data.response))
    .catch((error) => console.error(error))

  }, [search])

  const handleClosePanel = () => {
    setCardClick(false);
  }

  const handleShowPanel = () => {
    setCardClick(true);
  }

  const handleSearch = () => {
    setSearch(Math.random());
  }

  const handleSearchType = (e) => {
    setSearchType(e.target.value)
    setData();
  }

  const onClickDriverHandler = (e) => {
    setDriverInfo(e);
    handleShowPanel();
  }

  const onClickTeamHandler = (e) => {
    setTeamInfo(e);
    handleShowPanel();
  }

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
      {searchType === 'drivers' && <DriverList Drivers_Data= {data} onClickDriver = {onClickDriverHandler} />}
      {searchType === 'teams' && <TeamsList Teams_Data= {data} onClickTeam = {onClickTeamHandler}/>}
      <Modal show={cardClick} onHide={handleClosePanel} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Infomations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchType === 'drivers' && <DriverInfo driver_data = {driverInfo}/>}
          {searchType === 'teams' && <TeamInfo team_data = {teamInfo}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
