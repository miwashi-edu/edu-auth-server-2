const express = require('express');
const adminController = require("../controllers/admin_controller");
const router = express.Router();

/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/users', adminController.createUser);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: List all users
 *     description: Retrieves a list of users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/users', adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a specific user by their ID.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: The user ID.
 *     responses:
 *       200:
 *         description: User found.
 *       404:
 *         description: User not found.
 */
router.get('/users/:id', adminController.getUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates a user's information.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put('/users/:id', adminController.updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a specific user by their ID.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The user ID.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/users/:id', adminController.deleteUser);

/**
 * @swagger
 * /api/admin/groups:
 *   post:
 *     summary: Create a new group
 *     description: Adds a new group to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created successfully.
 */
router.post('/groups', adminController.createGroup);

/**
 * @swagger
 * /api/admin/groups:
 *   get:
 *     summary: List all groups
 *     description: Retrieves a list of groups.
 *     responses:
 *       200:
 *         description: A list of groups.
 */
router.get('/groups', adminController.getGroups);

/**
 * @swagger
 * /api/admin/groups/{name}:
 *   delete:
 *     summary: Delete a group
 *     description: Deletes a specific group by name.
 *     parameters:
 *     - in: path
 *       name: name
 *       required: true
 *       schema:
 *         type: string
 *       description: The group name.
 *     responses:
 *       200:
 *         description: Group deleted successfully.
 *       404:
 *         description: Group not found.
 */
router.delete('/groups/:name', adminController.deleteGroup);

/**
 * @swagger
 * /api/admin/users/{id}/groups:
 *   post:
 *     summary: Add a user to a group
 *     description: Adds a user to a specified group.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to group successfully.
 *       404:
 *         description: User or group not found.
 */
router.post('/users/:id/groups', adminController.addUserToGroup);

/**
 * @swagger
 * /api/admin/users/{id}/groups/{groupName}:
 *   delete:
 *     summary: Remove a user from a group
 *     description: Removes a user from a specified group.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The user ID.
 *     - in: path
 *       name: groupName
 *       required: true
 *       schema:
 *         type: string
 *       description: The group name.
 *     responses:
 *       200:
 *         description: User removed from group successfully.
 *       404:
 *         description: User or group not found.
 */
router.delete('/users/:id/groups/:groupName', adminController.removeUserFromGroup);

module.exports = router;
