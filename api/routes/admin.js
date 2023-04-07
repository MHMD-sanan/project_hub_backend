const router = require("express").Router();
const {
  addDeveloper,
  getAllDevelopers,
  updateDeveloperStatus,
} = require("../controllers/admin/DeveloperManagement");

const { login } = require("../controllers/admin/auth");

const {
  addProjects,
  getAllProjects,
  viewSingleProject,
  updateStatus
} = require("../controllers/admin/projects");

const {
  deleteTeamMember,
} = require("../controllers/admin/TeaManagement/RemoveTeamMember");
const { addTeam } = require("../controllers/admin/TeaManagement/addTeam");
const { addTeamLead } = require("../controllers/admin/TeaManagement/TeamLead");
const { dashboard } = require("../controllers/admin/DashBoard");

// admin login
router.post("/login", login);
// admin dashboard
router.get("/home", dashboard)

// adding new developer
router.post("/add_developer", addDeveloper);
// get all developers list
router.get("/get_all_developers", getAllDevelopers);
// to change status ie block and unblock
router.patch("/updateUser", updateDeveloperStatus);

// add new project
router.post("/addProjects", addProjects);
// get all project details to table
router.get("/get_all_projects", getAllProjects);
// view single project details
router.post("/view_single_project", viewSingleProject);

// add team member to project
router.patch("/add_team", addTeam);
// add team lead for project
router.patch("/add_team_lead", addTeamLead);
// remove a team member from project
router.patch("/delete_team_member", deleteTeamMember);
// update project status
router.patch("/update_project_status", updateStatus)


module.exports = router;
