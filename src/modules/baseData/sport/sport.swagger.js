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
 *  components:
 *    schemas:
 *      UpdateSport:
 *        type: object
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

/**
 * @swagger
 * /api/v1/sports/{id}:
 *  put:
 *    summary: update sport
 *    tags:
 *      - Sport
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateSport"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateSport"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/sports/{id}:
 *  get:
 *    summary: get by id sport
 *    tags:
 *      - Sport
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
 * /api/v1/sports/{id}:
 *  delete:
 *    summary: delete sport
 *    tags:
 *      - Sport
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
