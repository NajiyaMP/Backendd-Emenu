const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  image: [{
    type: String,
    default: '',
  }],
  
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);



// const mongoose = require('mongoose');

// const SettingsModel = new mongoose.Schema({
//     companyname: { type: String },
//     image: [{ type: String }],
//     contact: { type: Number },
//     address: {
//         street: { type: String },
//         city: { type: String },
//         state: { type: String },
//         zip: { type: String },
//         country: { type: String },
//     },
//     location: {
//         type: { type: String, enum: ['Point'], default: 'Point' },
//         coordinates: { type: [Number], required: true }, // [longitude, latitude]
//     },
// });
// SettingsModel.index({ location: '2dsphere' });

// const SettingsData = mongoose.model('SettingsData', SettingsModel);

// module.exports = SettingsData;