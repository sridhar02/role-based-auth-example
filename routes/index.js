const express = require("express");
const { authUser, authRole } = require("../basicAuth");
const { ROLE } = require("../data");

const router = express.Router();

/**
 * @openapi
 * /:
 *  get:
 *     tags:
 *     - Home page
 *     description: Home page route
 *     responses:
 *       200:
 *         description: Any one can access this api
 */
router.get("/", (req, res) => {
  res.send("Home Page");
});

/**
 * @openapi
 * /dashboard:
 *  get:
 *     tags:
 *     - Home page
 *     description: Dashboard route
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: The userId of the loggedIn user try with userIds 1,2, 3 where user 1 is admin & others are basic users.
 *        required: true
 *     responses:
 *       200:
 *         description: Only logged in users can access this api route
 */
router.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Route");
});

/**
 * @openapi
 * /admin:
 *  get:
 *     tags:
 *     - Home page
 *     description: Admin route
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: The userId of the loggedIn user, try with userId 1 who is an admin, if you try with others it will not work.
 *        required: true
 *     responses:
 *       200:
 *         description: Only logged & admins can only access this route
 */
router.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Route");
});

module.exports = router;
