const path = require("path");
const session = require("express-session");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connections.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sesh = {
  secret: "Very secret pass phrase",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sesh));

const hbs = exphbs.create({
  helpers: {
    format_date: (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));

app.listen(PORT, () => {
  console.log(`App listening on Port ${PORT}`);
  sequelize.sync({ force: false });
});
