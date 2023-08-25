const Role = require("../model/roles")

const createRole = async (req, res) => {
    try {
        const {
            role,
            permissions,
        } = req.body;

        const new_role = new Role({
            role,
            permissions,
        });

        await new_role.save();

        res.status(201).json({
            status: "success",
            message: "Role created successfully",
            data: {
                new_role,
            },
        })
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const updateRoleByName = async (req, res) => {
    try {
        const { roleName } = req.params;

        const {
            role,
            permissions,
        } = req.body;

        const updated_role = await Role.findOneAndUpdate(
            { role: roleName },
            {
                role,
                permissions,
            },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            message: "Role updated successfully",
            data: {
                updated_role,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const deleteRoleById = async (req, res) => {
    try {
        const { roleId } = req.params;

        await Role.findByIdAndDelete(roleId);

        res.status(200).json({
            status: "success",
            message: "Role deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();

        res.status(200).json({
            status: "success",
            message: "Roles retrieved successfully",
            data: {
                roles,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

const getRoleById = async (req, res) => {
    try {
        const { roleId } = req.params;

        const role = await Role.findById(roleId);

        res.status(200).json({
            status: "success",
            message: "Role retrieved successfully",
            data: {
                role,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

module.exports = {
    createRole,
    updateRoleByName,
    deleteRoleById,
    getAllRoles,
    getRoleById,
};
