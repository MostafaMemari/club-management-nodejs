/**
 * @swagger
 * tags:
 *  name: Belt
 *  description: belt
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateBelt:
 *        type: object
 *        required:
 *          - name
 *          - duration
 *        properties:
 *          name:
 *            type: string
 *          duration:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/belts:
 *  post:
 *    summary: create belt
 *    tags:
 *      - Belt
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateBelt"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateBelt"
 *    responses:
 *      201:
 *        description: created
 */
