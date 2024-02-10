/**
 * @swagger
 * tags:
 *  name: Role
 *  description: Role
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateRole:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            default: student
 *          description:
 *            type: string
 *            default: دسترسی شاگردان
 *          permissions:
 *            type: array
 *            default: [655e3ad52e6be02563a8c9cd,655e3ae62e6be02563a8c9ce]
 */

/**
 * @swagger
 * /api/v1/roles:
 *  post:
 *    summary: create role
 *    tags:
 *      - Role
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateRole"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateRole"
 *    responses:
 *      201:
 *        description: created
 */
