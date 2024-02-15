/**
 * @swagger
 * tags:
 *  name: User
 *  description: user Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateUser:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *          - confirmPassword
 *        properties:
 *          username:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          confirmPassword:
 *            type: string
 *          role:
 *            type: string
 *            enum: [ADMIN_CLUB]
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateUser:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          confirmPassword:
 *            type: string
 *          email:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginUser:
 *        type: object
 *        properties:
 *          identifier:
 *            type: string
 *            description: enter type email or username
 *          password:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *    summary: register new user
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateUser"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateUser"
 *    responses:
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: login new user
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/LoginUser"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/LoginUser"
 *    responses:
 *      200:
 *        description: success
 */
