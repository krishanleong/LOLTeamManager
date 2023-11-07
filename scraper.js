const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();
const fetchData = async () => { 
    try {
        console.log ("test")
        const res = await axios('https://u.gg/lol/mid-lane-tier-list');
            const html = res.data;
            const $ = cheerio.load (html);
            const champWinRates = [];
            
            $('div.rt-td.champion',html).each (function ()
            {
                const name = $(this).find ('div.rt-td.champion').text();
                champWinRates.push (name);        
                console.log ("pushing champs")
            })
            console.log ("test")
            console.log (champWinRates);
    }
    catch (err)  {
        console.log (err);
    }
    
}
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});

