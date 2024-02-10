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
 *            default: [6554827f6acf85e35050ae7c,65c751c4e73c83599bdb8d19]
 *          address:
 *            type: string
 *          phone:
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
