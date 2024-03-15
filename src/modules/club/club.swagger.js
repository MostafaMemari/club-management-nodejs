/**
 * @swagger
 * tags:
 *  name: Club
 *  description: club
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateClub:
 *        type: object
 *        required:
 *          - name
 *          - genders
 *          - sports
 *        properties:
 *          name:
 *            type: string
 *            default: باشگاه تکواندو یاری
 *          genders:
 *            type: array
 *            items:
 *              type: string
 *              enum: ["آقایان" , "بانوان"]
 *          sports:
 *            type: array
 *            default: [6554827f6acf85e35050ae7c]
 *          address:
 *            type: string
 *          phone:
 *            type: string
 *          adminClub:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateClub:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            default: باشگاه تکواندو یاری
 *          genders:
 *            type: array
 *            items:
 *              type: string
 *              enum: ["آقایان" , "بانوان"]
 *          sports:
 *            type: array
 *            default: [6554827f6acf85e35050ae7c]
 *          address:
 *            type: string
 *          phone:
 *            type: string
 *          adminClub:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/clubs:
 *  post:
 *    summary: create new club
 *    tags:
 *      - Club
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateClub"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateClub"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/clubs:
 *  get:
 *    summary: get all clubs
 *    tags:
 *      - Club
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/clubs/{id}:
 *  put:
 *    summary: update club
 *    tags:
 *      - Club
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateClub"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateClub"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/clubs/{id}:
 *  get:
 *    summary: get by id club
 *    tags:
 *      - Club
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/clubs/{id}:
 *  delete:
 *    summary: delete club
 *    tags:
 *      - Club
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
