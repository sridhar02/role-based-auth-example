const express = require("express");
const { authUser, authRole } = require("./basicAuth");
const app = express();
const { users, ROLE } = require("./data");
const { use } = require("./routes/projects");
const projectRouter = require("./routes/projects");
const homeRouter = require("./routes/index");
const { swaggerDocs } = require("./swagger");
// const  = require("sw")

app.use(express.json());
app.use(setUser);
app.use("/projects", projectRouter);
app.use("/", homeRouter);

function setUser(req, res, next) {
  const { userId } = req.query;
  const id = Number(userId);
  if (id) {
    req.user = users.find((user) => user.id === id);
  }
  next();
}

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  swaggerDocs(app, PORT);
});
