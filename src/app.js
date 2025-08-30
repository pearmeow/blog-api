const express = require("express");
const path = require("node:path");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Third party middleware

// enables requests from different origins
app.use(cors({}));

// Application level middleware

// parses json requests
app.use(express.json());
// parses urlencoded requests (forms with post)
app.use(express.urlencoded({ extended: true }));

// Router middleware

// TODO: Change when routers are implemented
app.use("/", routes);

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Express app listening on http://127.0.0.1:${PORT}`);
});
