const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TambalbanSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddres: {
            type: String
        },
        completeAddress: {
            road: { type: String },
            city_district: { type: String }, 
            village: { type: String },
            sub_district: { type: String },
            county: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String }
        }
    }
}, { timestamps: true })

function modelAreadyDeclared() {
    try {
        const Tambalban = mongoose.model('Tambalban');
        module.exports = Tambalban
        return true
    } catch (e) {
        return false
    }
}

if (!modelAreadyDeclared()) {
    const Tambalban = mongoose.model('Tambalban', TambalbanSchema);
    module.exports = Tambalban
}