
const form = document.querySelector('form');
const submit = document.querySelector('button');
const mainInfo = document.querySelector('h3');
const parSpan = document.querySelectorAll('p span');

form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    mainInfo.innerText = 'Buscando...';
    const ativo = document.querySelector('input').value;

    fetch(`/cotacao?ativo=${ativo}`).then((res)=>{

        res.json().then((data)=>{
            if(data.error){
                mainInfo.innerText = data.error.messageError;
                parSpan[0].innerText = "R$ 0,00";
                parSpan[1].innerText = "R$ 0,00";
                parSpan[2].innerHTML = `R$ 0,00`;
                parSpan[3].innerHTML = `R$ 0,00`;
                parSpan[4].innerHTML = `R$ 0,00`;
            } else {
                mainInfo.innerText = ativo.toUpperCase();
                parSpan[0].innerText = "R$ "+data.dayOpen;
                parSpan[1].innerText = "R$ "+data.previous_close_price;
                parSpan[2].innerHTML = `<img src="./images/arrow-up.svg"> R$ ${data.dayHigh} `;
                parSpan[3].innerHTML = `<img src="./images/arrow-down.svg"> R$ ${data.dayLow} `;
                parSpan[4].innerHTML = `R$ ${data.price_current} `;
            };
        })
    
    })

})
