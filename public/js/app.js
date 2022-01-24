//console.log('client side javascript is loaded')


fetch("http://localhost:3000/weather?address=boston").then((response)=>{
response.json().then((data)=>{
    if(data.error)
    {
    console.log(data.error)
    }else{
        console.log(data.name)
    }
    
})
})

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')



weatherForm.addEventListener('submit',(event)=>{

    const Location=search.value;
    event.preventDefault()
        console.log('testing')
        messageOne.textContent="loading....";
        messageTwo.textContent="";
        if(Location.length==0)
        {
            messageOne.textContent='please enter the location';
        }else{
        fetch(`http://localhost:3000/weather?address=${Location}`).then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                {
               messageTwo.textContent=data.error
                }else{
                    messageOne.textContent=data.name;
                    messageTwo.textContent=data.forecastData;
                }
                
            })
            })
        }
})