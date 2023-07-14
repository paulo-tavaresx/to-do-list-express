const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const uri =
  'mongodb+srv://paulotavares:severino@todo-list.uggyog8.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(uri)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => {
    console.log(err)
  })
