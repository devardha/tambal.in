const Tambalban = require('../../../models/tambalban.model');
const dbConnect = require('../../../utils/dbConnect');
const axios = require('axios');
const { getDistanceFromLatLonInKm } = require('../../../utils/calculation')

dbConnect()

export default async function(req, res) {
    const { method, query: { coordinates } } = req;

    function compare( a, b ) {
        if ( a.distance < b.distance ){
          return -1;
        }
        if ( a.distance > b.distance ){
          return 1;
        }
        return 0;
    }

    switch(method){
        case 'GET':
            try {
                const tambalbans = await Tambalban.find({})
                const wrapper = []

                if(!coordinates){
                    return res.status(400).json({ data: "Coordinates not found" })
                }

                const separatedQuery = coordinates.split(",")

                const lonme = parseFloat(separatedQuery[0])
                const latme = parseFloat(separatedQuery[1])

                if(tambalbans){
                    tambalbans.map(item => {
                        const tambalbanObject = {
                            address: item.address,
                            picture: item.picture,
                            description: item.description,
                            location: item.location,
                            distance: getDistanceFromLatLonInKm(latme, lonme, item.location.coordinates[1], item.location.coordinates[0]),
                        }

                        wrapper.push(tambalbanObject)
                    })
                }
                const sortedResult = wrapper.sort(compare)
    
                return res.status(200).json(sortedResult)
            } catch (error) {
                console.log(error)
                return res.status(200).json({ data: "Query failed", error: error })
            }
        default:
            res.status(405).json({ data: "Method not allowed" })
    }
}