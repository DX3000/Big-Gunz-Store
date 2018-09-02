const express =require("express");
const app = express();

const jsonObj = {
    foo: "fooObject"
};

app.get('/api/foo', (req, res) => {
    res.json(jsonOjb);
})