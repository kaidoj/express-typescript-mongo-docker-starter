import express, { Router } from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET, ENVIRONMENT, API_VERSION } from "./util/secrets";

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as apiController from "./controllers/api";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

if (ENVIRONMENT !== "test") {
    mongoose.connect(mongoUrl, { 
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
    }).then(
        () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    });
}

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (ENVIRONMENT !== "test") {
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true
        })
    }));
}
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
const router = Router();
router.get("/", apiController.index);
router.get("/:id", apiController.get);
router.post("/", apiController.add);
router.put("/:id", apiController.upd);
router.delete("/:id", apiController.del);


// version 1 API
app.use(`/api/${API_VERSION}/`, router);

export default app;
