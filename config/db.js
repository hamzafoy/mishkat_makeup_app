/*::::::::::::::::::::::::::::::::::::::::
::::::::  Required Dependencies  :::::::::
::::::::::::::::::::::::::::::::::::::::*/

const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGODB_URI || config.get('mongoURI');



/*::::::::::::::::::::::::::::::::::::::::
:::::  Connection to Mongo Database  :::::
::::::::::::::::::::::::::::::::::::::::*/

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};



/*::::::::::::::::::::::::::::::::::::::::
::::  Exporting Database Connection  :::::
::::::::::::::::::::::::::::::::::::::::*/

module.exports = connectToDatabase;