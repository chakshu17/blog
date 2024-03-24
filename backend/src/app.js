const express = require('express');
const app = express();
const authRoutes = require('./routers/auth/auth')


require('./database/db');
app.use(express.json());

app.use('/auth', authRoutes)

app.listen(3000, () => {
    console.log("app is served");
});