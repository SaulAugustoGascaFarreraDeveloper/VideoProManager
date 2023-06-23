const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');

const videoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    enum: ['Tips', 'Sabias Que?', 'Tratamientos', 'Historias de Exito'],
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  url: {
    type: String,  
  },
  fechaSubida: {
    type: String,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
