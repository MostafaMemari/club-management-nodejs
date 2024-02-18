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
 *          nextBelt:
 *            type: array
 *          underYear:
 *            type: string
 *          upperYear:
 *            type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBelt:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          duration:
 *            type: string
 *          nextBelt:
 *            type: array
 *          underYear:
 *            type: string
 *          upperYear:
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

/**
 * @swagger
 * /api/v1/belts/{id}:
 *  put:
 *    summary: create belt
 *    tags:
 *      - Belt
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: belt object id
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateBelt"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateBelt"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/belts:
 *  get:
 *    summary: get all belts
 *    tags:
 *      - Belt
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/belts/{id}:
 *  get:
 *    summary: get by id belt
 *    tags:
 *      - Belt
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
 * /api/v1/belts/{id}:
 *  delete:
 *    summary: delete belt
 *    tags:
 *      - Belt
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
