import React,{useState,useEffect} from 'react'
// Components
import Form from './Form'
import Champion from './Champion'

const App = () => {
    const API_KEY = 'RGAPI-93af7fea-56ca-44ad-a582-b2d187b247e6';
    const CHAMPION_URL = 'http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json';
    // USE STATE
    const [name, setName] = useState('');
    const [summonerId, setSummonerId] = useState('')
    const [filteredChampions, setFilteredChampions] = useState([])
    const [champions, setChampions] = useState([])
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

    useEffect(() => {
        if(summonerId !== ''){
            fetch('http://ddragon.leagueoflegends.com/cdn/11.19.1/data/en_US/champion.json')
            .then(res => res.json())
            .then(data => {
                let newChamps = []
                for (const [key, value] of Object.entries(data.data)) {
                    newChamps.push({name:key,id:value.key})
                }    
                setChampions(newChamps)
                // FETCH CHAMPION DATA
                fetch(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    let filteredChamps = data.filter(item => item.chestGranted === false)
                    console.log(filteredChamps);
                    setFilteredChampions(filteredChamps)
                })
            })
        }
    },[summonerId])

    return (
        <>
        <Form name={name} setName={setName} region={setRegion} setRegion={setRegion} handleSubmit={handleSubmit}/>
        
        <main>
            {
            filteredChampions.map(champ => {
                const champObj = champions.find(item => item.id === String(champ.championId))  
                return (
                    <Champion {...champObj}/>
                ) 
            })
        }
        </main>
        </>
    )
}

export default App
