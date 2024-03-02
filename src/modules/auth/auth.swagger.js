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
 *      Login:
 *        type: object
 *        required:
 *          - nationalCode
 *        properties:
 *          nationalCode:
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
 * /api/v1/auth/login:
 *  post:
 *    summary: login student and coach
 *    tags:
 *      - Authorization
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/Login"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Login"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/auth/getme:
 *  get:
 *    summary: get user , student , coach by id
 *    tags:
 *      - Authorization
 *    responses:
 *      200:
 *        description: success
 */
