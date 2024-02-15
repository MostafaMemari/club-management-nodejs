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
 *      CreateAuthorization:
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
 *      UpdateAuthorization:
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
 * /api/v1/auth/user/login:
 *  post:
 *    summary: register new user
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
 *      201:
 *        description: created
 */
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: login new user
 *    tags:
 *      - Authorization
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/LoginAuthorization"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/LoginAuthorization"
 *    responses:
 *      200:
 *        description: success
 */
