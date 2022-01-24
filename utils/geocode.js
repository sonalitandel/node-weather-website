const request = require("request")


const geoCode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic29uYWxpanRhbmRlbCIsImEiOiJja3lxMHA0bWswZjl2MnlwdDFuM2Q5OWN5In0.TWjJxqicsRdLuiDF4ymtHw`
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('something went wrong. unable to connect')
        }
        else if(body.features.length===0)
            {
               callback('unable to find location');
            }else{
                        const respBody=body
                        callback(undefined,{'latitude':respBody.features[0].geometry.coordinates[0],'longitude' :respBody.features[0].geometry.coordinates[1],'placename' :respBody.features[0].place_name})
                    
                    }
    })

}

module.exports={
    'geoCode':geoCode
}