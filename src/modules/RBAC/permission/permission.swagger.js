/**
 * @swagger
 * tags:
 *  name: Permission
 *  description: Permission
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreatePermission:
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
 */

/**
 * @swagger
 * /api/v1/permissions:
 *  post:
 *    summary: create permission
 *    tags:
 *      - Permission
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreatePermission"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreatePermission"
 *    responses:
 *      201:
 *        description: created
 */
