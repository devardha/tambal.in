const Tambalban = require('../../../models/tambalban.model');
const dbConnect = require('../../../utils/dbConnect');
const axios = require('axios')

dbConnect()

export default async function(req, res) {
    const { method } = req;
    switch(method){
        case 'GET':
            try {
                const tambalbans = await Tambalban.find({})
    
                return res.status(200).json(tambalbans)
            } catch (error) {
                console.log(error)
                return res.status(200).json({ data: "Query failed", error: error })
            }
        case 'POST':
            try {
                const { address, picture, description, coordinates } = req.body
                const lon = coordinates[0]
                const lat = coordinates[1]

                const requestUrl = `https://us1.locationiq.com/v1/reverse.php?key=${process.env.GEOLOCATION_KEY}&lat=${lat}&lon=${lon}&zoom=16&accept-language=id&format=json`
                
                const { data } = await axios.get(requestUrl)


                const kodeposApi = `https://caritambalban.herokuapp.com/api/v1/kodepos/${data.address.postcode}`
                const kodeposResponse = await axios.get(kodeposApi)
                const kodeposApiData = kodeposResponse.data

                if(data && kodeposApiData){
                    const tambalbanObject = {
                        address: address,
                        picture: picture || "",
                        description: description || "",
                        location: {
                            type: "Point",
                            coordinates: [lon, lat],
                            formattedAddres: data.display_name,
                            completeAddress: {
                                road: data.address.road,
                                city_district: data.address.city_district,
                                village: data.address.village,
                                sub_district: kodeposApiData.sub_district,
                                county: data.address.county,
                                city: kodeposApiData.city,
                                state: data.address.state,
                                country: data.address.country,
                            }
                        },
                    }
    
                    const newTambalban = await Tambalban.create(tambalbanObject)
        
                    return res.status(200).json(newTambalban)
                }
                else{
                    return res.status(400).json({data: "Failed to create new data"})
                }
            } catch (error) {
                console.log(error)
                return res.status(200).json({ data: "Query failed", error: error })
            }
        default:
            res.status(405).json({ data: "Method not allowed" })
    }
}