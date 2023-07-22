const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app= express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const stripe=require("stripe")("pk_test_51NWMtHDQEB8Kkh6ZyP3LoUiqDQrNmmlzSekouBSK7a4m7Iaf47KsiDH51jJOKlTYmcCxSN9ulpSUlJLlSbeFUmSS00FHixkPaC");
