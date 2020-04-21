module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/moba_admin_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}