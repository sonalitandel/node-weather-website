const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const geoCodecls=require('../utils/geocode.js')
const forecastCls=require('../utils/forecast.js')

//define path for express config

const publicDirLocation=path.join(__dirname,'../public')
const templateLocation=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Set up handlebars and view location
app.set('view engine', 'hbs');
app.set('views',templateLocation)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirLocation))


app.get('',(req,res)=>{
    res.render('index',{title:'weather app',name:'sonali Tandel'})
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About Me',name:'sonali Tandel'})
})
app.get('/help',(req,res)=>{
    res.render('help',{title:'help',name:'sonali Tandel'})
})
app.get('/weather',(req,res)=>{
    debugger;
    if(!req.query.address)
    {
        return res.send({error:'send the address'})
    }
    geoCodecls.geoCode(req.query.address,(error,{latitude,longitude,placename}={})=>{
        if(error)
        {
            return res.send(error)
        }
    forecastCls.forecast(longitude,latitude, (error, forecastData) => {
        if(error)
        {
            return res.send(error)
        }
        res.send({name:placename,forecastData:forecastData})
      })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return  res.send({error:'u must provide search rating'})
    }
    console.log(req.query)
    res.send({'products':[]})
})
// app.get('*',(req,res)=>{
//     res.render('404',{
//         title:'404',
//         name:'Sonali Tandel',
//         title:'Page not found'
//     })
// })

app.listen(3000,()=>{
    console.log('server listening to port 3000')
})