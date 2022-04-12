// import required node_modules
// ! DO NOT CHANGE ANYTHING HERE.
// ! CHANGING ANYTHING HERE MIGHT BREAK THE APP
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
// ------------------------------------------------------------------------
//
// import required created files
const routes = require("./routers");
const uploadJsonData = require("./utils/uploadJsonData");
const deleteAllData = require("./utils/deleteAllCollection");

// to be removed later
const announcementModel = require("./database/models/announcement.model");
const addNewCompany = require("./utils/addNewCompany");
const addNewJob = require("./utils/addNewJob");
const {
  markAsRead,
  deleteNotification,
} = require("./controllers/notification.controller");

// initialize express app
const app = express();

// /////////////////////    CORS    /////////////////////////////////////////
// ! DO NOT CHANGE ANYTHING HERE
//
// to allow all cross-origin requests, use
// app.use(cors());
//
// to allow cors for selected origins, use
app.use(
  cors({
    // use JSON.parse to convert the string received from process.env to required JavaScript format (array)
    origin: JSON.parse(process.env.ALLOWED_ORIGINS),
    optionsSuccessStatus: 200,
  })
);
// /////////////////////    CORS END /////////////////////////////////////////

// log all requests in console
app.use(morgan("dev"));

// ///////////////    Compulsory Middlewares    //////////////////////////////
// ! DO NOT CHANGE ANYTHING HERE
// to parse json body data from requests (i.e req.body)
app.use(express.json());
// to parse data from x-urlencoded-forms
app.use(express.urlencoded({ extended: true }));
// ///////////////    Compulsory Middlewares END /////////////////////////////

// //////////////////////////////    ROUTES   ////////////////////////////////

// test route
// app.use("/test", passport.authenticate("jwt", { session: false }), routes.test);

// login the user
app.post("/login", routes.login);
app.get(
  "/verifyToken",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({ isTokenValid: "valid" });
  }
);

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  routes.profile
);

app.get(
  "/studentProfile/:id",
  passport.authenticate("jwt", { session: false }),
  routes.studentProfile
);

app.get("/announcement", async (req, res) => {
  const data = await announcementModel.find({});
  res.status(200);
  res.json(data);
});

// Calling notifications using /profile
// app.get("/notification",
//   passport.authenticate("jwt", { session: false }),
//   routes.notification
// );

/* get request body example
{ "password":"XYZ"} 
*/
app.post(
  "/reset-password",
  passport.authenticate("jwt", { session: false }),
  routes.resetPassword
);

/* get request body example
{ "contactNo":"123XXXX"} 
*/
app.post(
  "/update-phone-number",
  passport.authenticate("jwt", { session: false }),
  routes.updateContactNo
);

app.post(
  "/update-resume-link",
  passport.authenticate("jwt", { session: false }),
  routes.updateResume
);

app.post(
  "/update-linked-url",
  passport.authenticate("jwt", { session: false }),
  routes.updateLinkedIn
);

app.use("/jobs", passport.authenticate("jwt", { session: false }), routes.jobs);

app.use(
  "/companies",
  passport.authenticate("jwt", { session: false }),
  routes.companies
);

app.use(
  "/students",
  passport.authenticate("jwt", { session: false }),
  routes.students
);

app.post(
  "/tpo/uploadJsonData",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    req.user.email === "placements@iiitl.ac.in"
      ? uploadJsonData(req, res, next)
      : next({
          name: "Unauthorized request",
          message: "This request is only authorized for the TPO",
          status : 401
        });
  }
);
app.post(
  "/tpo/deleteAllData",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    req.user.email === "placements@iiitl.ac.in"
      ? deleteAllData(req, res, next)
      : next({
          name: "Unauthorized request",
          message: "This request is only authorized for the TPO",
          status: 401
        });
  }
);

app.post(
  "/markAsRead",
  passport.authenticate("jwt", { session: false }),
  markAsRead
);

app.post(
  "/deleteNotification",
  passport.authenticate("jwt", { session: false }),
  deleteNotification
);

// ///////////////////////////    ROUTES END  ////////////////////////////////

// Handle errors.
app.use(function (err, req, res, next) {
  // console.log(req)
  console.error(">ERROR", err.name, ": ", err.message);
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
