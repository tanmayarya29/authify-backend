const express = require("express");
const rolesRouter = express.Router();

const {
    createRole,
    updateRoleByName,
    deleteRoleById,
    getAllRoles,
    getRoleById,
} = require("../controller/rolesController");

rolesRouter.post("/create", createRole);
rolesRouter.put("/update/:roleName", updateRoleByName);
rolesRouter.delete("/delete/:roleId", deleteRoleById);
rolesRouter.get("/", getAllRoles);
rolesRouter.get("/:roleId", getRoleById);

module.exports = rolesRouter;

