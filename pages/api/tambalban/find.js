const Tambalban = require('../../../models/tambalban.model')
const dbConnect = require('../../../utils/dbConnect')

dbConnect()

export default async function(req, res){
    const { method, query: { q } } = req

    switch(method){
        case 'GET':
            try {
                if(!q){
                    return res.status(400).json({ data: "Query string not found" })
                }

                const REGEX_TEMPLATE = new RegExp(q, 'i')
                const findTambalban = await Tambalban.find({"location.formattedAddres": {$regex: REGEX_TEMPLATE}})

                return res.status(200).json(findTambalban)
            } catch (error) {
                return res.status(200).json({ data: "Query failed", error: error })
            }
        default:
            res.status(405).json({ data: "Method not allowed" })
    }

}