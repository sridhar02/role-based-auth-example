const { ROLE } = require("./data");

function canViewProject(user, project) {
  console.log(
    user,
    project,
    project.userId === user.id,
    user.role === ROLE.ADMIN,
    user.role === ROLE.ADMIN || project.userId === user.id
  );
  return user.role === ROLE.ADMIN || project.userId === user.id;
}

function scopedProjects(user, projects) {
  if (user.role === ROLE.ADMIN) return projects;
  return projects.filter((project) => project.userId === user.id);
}

module.exports = { canViewProject, scopedProjects };
