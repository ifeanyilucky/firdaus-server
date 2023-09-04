const express = require("express");
const router = express.Router();
import { login, register } from "../controllers/auth.controller";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user and generate a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Successful login. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.route("/login").post(login);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         middleName:
 *           type: string
 *           description: The middle name of the user (optional).
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar image.
 *         password:
 *           type: string
 *           description: The user's password.
 *         admissionNumber:
 *           type: number
 *           description: The admission number of the user (optional).
 *         department:
 *           type: string
 *           description: The department the user belongs to (optional).
 *         class:
 *           type: string
 *           description: The class or group the user is associated with.
 *         reports:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IReport'
 *           description: An array of user's reports (optional).
 *         role:
 *           type: string
 *           description: The role or permission level of the user.
 *         tel:
 *           type: string
 *           description: The telephone number of the user (optional).
 *         passwordResetExpire:
 *           type: string
 *           format: date-time
 *           description: The date and time when the password reset token expires.
 *         passwordResetToken:
 *           type: string
 *           description: The password reset token for the user.
 */
router.route("/register").post(register);

export default router;
