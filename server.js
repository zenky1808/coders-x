require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//=====MongoDB=====
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('CONNECTED Successfully')
});
//=====Route=====
const booksRoute = require('./routes/books.route');
const usersRoute = require('./routes/users.route');
const transRoute = require('./routes/trans.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const productsRoute = require('./routes/product.route');
const authMiddle = require('./middlewares/auth.middleware');
const sessionMiddle = require('./middlewares/session.middleware')


//=====View=====
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.sessionKey));
app.use(sessionMiddle);
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render('index');
});
//=====User Route=====
app.use('/books', booksRoute);
app.use('/users', authMiddle.auth, usersRoute);
app.use('/trans', authMiddle.auth, transRoute);
app.use('/auth', authRoute);
app.use('/product', productsRoute)
app.use('/cart', cartRoute)




// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
