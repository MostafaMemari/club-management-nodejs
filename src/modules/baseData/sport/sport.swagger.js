/**
 * @swagger
 * tags:
 *  name: Sport
 *  description: Sport
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateSport:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            default: تکواندو
 *          type:
 *            type: string
 *            default: رزمی
 *          description:
 *            type: string
 *            default: تکواندوعه دیگه چی بگم
 */

/**
 * @swagger
 * /api/v1/sports:
 *  post:
 *    summary: create sport
 *    tags:
 *      - Sport
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateSport"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateSport"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/sports:
 *  get:
 *    summary: get all belt sports
 *    tags:
 *      - Sport
 *    responses:
 *      200:
 *        description: success
 */
