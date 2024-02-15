/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: authorization use student and coach
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginUser:
 *        type: object
 *        required:
 *          - identifier
 *          - password
 *        properties:
 *          identifier:
 *            type: string
 *            description: enter type email or username
 *          password:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginStudent:
 *        type: object
 *        required:
 *          - nationalID
 *        properties:
 *          nationalID:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/auth/user/login:
 *  post:
 *    summary: login user
 *    tags:
 *      - Authorization
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

/**
 * @swagger
 * /api/v1/auth/student/login:
 *  post:
 *    summary: login student
 *    tags:
 *      - Authorization
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/LoginStudent"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/LoginStudent"
 *    responses:
 *      200:
 *        description: success
 */
