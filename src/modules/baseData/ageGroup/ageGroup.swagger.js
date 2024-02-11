/**
 * @swagger
 * tags:
 *  name: AgeGroup
 *  description: age group student
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateAgeGroup:
 *        type: object
 *        required:
 *          - name
 *          - fromDate
 *          - toDate
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          fromDate:
 *            type: string
 *            description : length 10
 *          toDate:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/ages:
 *  post:
 *    summary: create age group
 *    tags:
 *      - AgeGroup
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateAgeGroup"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateAgeGroup"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/ages:
 *  get:
 *    summary: get All age groups
 *    tags:
 *      - AgeGroup
 *    responses:
 *      200:
 *        description: success
 */
