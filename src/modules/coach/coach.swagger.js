/**
 * @swagger
 * tags:
 *  name: Coach
 *  description: Coach Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      RegisterCoach:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - nationalCode
 *        properties:
 *          firstName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Mostafa
 *          lastName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Memari
 *          nationalCode:
 *            type: string
 *            description : length 10
 *            default: 4900782343
 *          belt:
 *            type: string
 *          beltDate:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          gender:
 *            type: string
 *            enum: [مرد, زن]
 *          mobile:
 *            type: string
 *          fatherName:
 *            type: string
 *          address:
 *            type: string
 *          birthDay:
 *            type: string
 *          clubs:
 *            type: array
 *          coachProfile:
 *            description: upload profile coach
 *            type: file
 *
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateCoach:
 *        type: object
 *        properties:
 *          firstName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Mostafa
 *          lastName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Memari
 *          nationalCode:
 *            type: string
 *            description : length 10
 *            default: 4900782343
 *          belt:
 *            type: string
 *          beltDate:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          gender:
 *            type: string
 *            enum: [مرد, زن]
 *          mobile:
 *            type: string
 *          fatherName:
 *            type: string
 *          address:
 *            type: string
 *          registerDate:
 *            type: string
 *          birthDay:
 *            type: string
 *          clubs:
 *            type: array
 *          coachProfile:
 *            description: upload profile coach
 *            type: file
 */

/**
 * @swagger
 * /api/v1/coachs/register:
 *  post:
 *    summary: register coach
 *    tags:
 *      - Coach
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/RegisterCoach"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/RegisterCoach"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/RegisterCoach"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/coachs:
 *  get:
 *    summary: get all coachs
 *    tags:
 *      - Coach
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/coachs/{id}/update-profile:
 *  put:
 *    summary: update prifile coach
 *    tags:
 *      - Coach
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: coach object id
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/UpdateCoach"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateCoach"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateCoach"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/coachs/{id}:
 *  get:
 *    summary: get coach by id
 *    tags:
 *      - Coach
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: coach object id
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/coachs/{id}:
 *  delete:
 *    summary: remove coach by id
 *    tags:
 *      - Coach
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: coach object id
 *    responses:
 *      200:
 *        description: success
 */
