const express = require("express");
const { authUser } = require("../basicAuth");
const router = express.Router();
const { projects } = require("../data");
const { canViewProject, scopedProjects } = require("../permissions");

/**
 * @openapi
 * /projects:
 *   get:
 *     tags:
 *     - Projects
 *     description: Route to get all projects for signedIn users!
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: The userId of the loggedIn user, try with admin userId 1 or others with 2 & 3.
 *        required: true
 *        default: ""
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", authUser, (req, res) => {
  res.json(scopedProjects(req.user, projects));
});

/**
 * @openapi
 * /projects/{projectId}:
 *   get:
 *     tags:
 *     - Projects
 *     description: Route to get a particular project details for signedIn users!
 *     parameters:
 *      - name: projectId
 *        in: path
 *        description: The projectId to the project details, try with project ids 1, 2 , 3
 *        required: true
 *        default: ""
 *      - name: userId
 *        in: query
 *        description: The userId of the loggedIn user, try with admin userId 1 or others with 2 & 3.
 *        required: true
 *        default: ""
 *     responses:
 *       200:
 *         description: Returns the project details.
 */
router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not allowed");
  }
  next();
}

module.exports = router;
