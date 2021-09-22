import React,{useState,useEffect} from 'react'
// Components
import Form from './Form'

const App = () => {
    const API_KEY = 'RGAPI-5b1604c4-9dc2-4680-ba22-dd8166d2d4d0';
    const CHAMPION_URL = 'http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json';
    // USE STATE
    const [name, setName] = useState('');
    const [summonerId, setSummonerId] = useState('')
    const [champions, setChampions] = useState({})
    const [region, setRegion] = useState('eun1');

    // FETCH FUNCTION
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => setSummonerId(data.id))
        .catch(error => console.log('This user does not exist on this server'))
        
    
        setName('');
    }

    // USE EFFECT
    useEffect(() => {
        fetch(CHAMPION_URL)
        .then(res => res.json())
        .then(data => setChampions({...data.data}))

    },[CHAMPION_URL])

    useEffect(() => {
        for (const [key, value] of Object.entries(champions)) {
            console.log(`${key}: ${value.key}`);
        }
    },[champions])

    return (
        <>
        <Form name={name} setName={setName} region={setRegion} setRegion={setRegion} handleSubmit={handleSubmit}/>

    
        </>
    )
}

export default App
