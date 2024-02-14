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
 *  components:
 *    schemas:
 *      UpdateRole:
 *        type: object
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

/**
 * @swagger
 * /api/v1/roles:
 *  get:
 *    summary: get all roles
 *    tags:
 *      - Role
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/roles/{id}:
 *  put:
 *    summary: update role
 *    tags:
 *      - Role
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateRole"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateRole"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/roles/{id}:
 *  get:
 *    summary: get by id role
 *    tags:
 *      - Role
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
 * /api/v1/roles/{id}:
 *  delete:
 *    summary: delete role
 *    tags:
 *      - Role
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
