const credentials= require('./credentials.js')
const request = require('request')

const geoCode = function(place){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + credentials.MAPBOX_TOKEN

    request({ url, json: true}, function(error, response){
        if(error){
            console.log(error)
        }
        else{
            const data1 = response.body.features
            
            const info1 = {
                lat: data1[0].center[1],
                long: data1[0].center[0]
            }
            weather(info1.lat, info1.long)
        }
    })
}

const weather = function(lat, long){
    const url= 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + lat + ',' + long + '?lang=es&units=si'
    request ({url, json: true}, function(error, response){
        if(error)
            console.log(error)
        else{
            const data = response.body
            let probLluvia = data.daily.data[0].precipProbability
            probLluvia = probLluvia*100
            const txt = data.daily.data[0].summary + ' Actualmente esta a ' + data.currently.temperature + 'ºC. Hay ' + probLluvia + '% de probabilidad de lluvia.'  
            console.log(txt)
        }
    })
}

module.exports = {
    geoCode: geoCode
}
