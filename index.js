const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Yelp camp!!.')
})

app.listen(5500, ()=>{
    console.log('Serving on port 5500.')
})