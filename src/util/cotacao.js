const request = require('request');

// const token = 'ouA6GfmOPqjUFRmX6pKGShaH0QChrao28YfxhkzmKJEnYlLtjfMKgmli6Lwk';
const token = 'brcff8vrh5rap841kceg';

const cotacao = (symbol, callback)=>{
    'https://finnhub.io/api/v1/quote?symbol=AAPL&token='
    
    // const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${token}`;
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`;

    request.get({url: url, json: true}, (err, response, body)=>{

        console.log(body);
        if(err) {
            callback({
                messageError: `Something went error ${err}`,
                status: 500
            }, undefined);
        }
        
        if(!Object.keys(body).length){
            callback({
                messageError: 'No data found!',
                status: 404
            }, undefined);
        } else {
            let data = {
                previous_close_price: body.pc,
                price_current: body.c,
                dayOpen: body.o,
                dayLow: body.l,
                dayHigh: body.h,
            }

            callback(undefined, data);            
        } 


    });
}

module.exports = {
    cotacao
}

