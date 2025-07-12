const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const itemRouter = require('./item');
const cartRouter = require('./cart');
const userRouter = require('./user');
const addonRouter = require('./addons');



app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemRouter);
app.use('/api/cart', cartRouter);
app.use('/api/user', userRouter);
app.use('/api/addons', addonRouter);


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
