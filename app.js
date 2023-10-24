
const form = document.querySelector('#searchForm');
const inputText = document.querySelector('input');
const list = document.querySelector('ul');
const lane = document.querySelector('select');


const addTop = document.querySelector('#top');
const addJg = document.querySelector('#jg');
const addMid = document.querySelector('#mid');
const addBot = document.querySelector('#bot');
const addSup = document.querySelector('#sup');

const topHeader = document.querySelector('#topheader');
const jgHeader = document.querySelector('#jgheader');
const midHeader = document.querySelector('#midheader');
const botHeader = document.querySelector('#botheader');
const supHeader = document.querySelector('#supheader');

let champData = [];

//grab puuid from summoner name

fetch('champ.json')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        champData = data;
    });
    
form.addEventListener ('submit', async (e) => {
    e.preventDefault();
    const searchTerm = inputText.value;
    const request = new Request(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchTerm}?api_key=RGAPI-d52c3c21-8210-4de1-9e54-dc773ab03006`);
    
    try {
        console.log (request);
        const res = await axios.get (request.url);
        console.log (res.data);
        const puuid = res.data.puuid;
         const req2 = new Request (`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=RGAPI-d52c3c21-8210-4de1-9e54-dc773ab03006`);
         const masteryData = await axios.get (req2.url);
         console.log ("Mastery Data");
         console.log (masteryData);
        console.log (champData);


        if (lane.value === 'top')
        {
            topHeader.innerText += `: ${searchTerm}`
        }
        if (lane.value === 'jg')
        {
            jgHeader.innerText += `: ${searchTerm}`
        }
        if (lane.value === 'mid')
        {
            midHeader.innerText += `: ${searchTerm}`
        }
        if (lane.value === 'bot')
        {
            botHeader.innerText += `: ${searchTerm}`
        }
        if (lane.value === 'sup')
        {
            supHeader.innerText += `: ${searchTerm}`
        }
        for (let i = 0; i < 10; i++)
        {
            for (let champName in champData.data)
            {                
                if (champData.data.hasOwnProperty(champName))
                {                 
                    const championData = champData.data[champName];
                    const championId = masteryData.data[i].championId;
                    // console.log (champData[champName].key);
                    if (championId === parseInt(championData.key))
                    {                        
                        const newIMG = document.createElement('img');
                        newIMG.src = `https://static.bigbrain.gg/assets/lol/riot_static/13.19.1/img/champion/${champName}.webp`;
                        newIMG.classList.add('img-fluid');
                        newIMG.classList.add('w-25');

                        if (lane.value === 'top')
                        {
                            addTop.append(newIMG);
                        }
                        if (lane.value === 'jg')
                        {
                            addJg.append(newIMG);
                        }
                        if (lane.value === 'mid')
                        {
                            addMid.append(newIMG);
                        }
                        if (lane.value === 'bot')
                        {
                            addBot.append(newIMG);
                        }
                        if (lane.value === 'sup')
                        {
                            addSup.append(newIMG);
                        }
                    }   
                }
            }
            
            
        }
        // /lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}
        // const mastery = await axios.get ();
    }
    catch (error){
        console.log (error);
    }
});
