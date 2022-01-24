const request=require('request')
//http://api.weatherstack.com/current?access_key=df43cbf1f9db2a78b1029566caa7dccf&query=37.8267,-122.4233
const forecast=(langitude,longitude,callback)=>{
    const url= `http://api.weatherstack.com/current?access_key=df43cbf1f9db2a78b1029566caa7dccf&query=${encodeURIComponent(langitude)},${encodeURIComponent(longitude)}&units=f`  
    request({url,json:true},(error,{body})=>{
        if(error)
        { 
            callback('when u turn off ur network, u can call the weather forecase URL, it wll come to error part')
        }
        else if(body.error)
        {
            callback('unable to get weather forecast')
        }
        else{
            const currentDta=body.current;
            callback(undefined,`${currentDta.weather_descriptions[0]}. It is currently  ${currentDta.temperature} degrees out. It Feels like ${currentDta.feelslike} degrees out`)

        }
    })
    
}

module.exports={
    'forecast':forecast
}


