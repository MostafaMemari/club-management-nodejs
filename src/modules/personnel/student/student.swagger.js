/**
 * @swagger
 * tags:
 *  name: Student
 *  description: Student Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateStudent:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - nationalID
 *        properties:
 *          firstName:
 *            type: string
 *            description : min length 2 - max length 50
 *          lastName:
 *            type: string
 *            description : min length 2 - max length 50
 *          nationalID:
 *            type: string
 *            description : length 10
 *          role:
 *            type: string
 *            default: STUDENT
 *          gender:
 *            type: string
 *            enum: [مرد, زن]
 *          mobile:
 *            type: string
 *          fatherName:
 *            type: string
 *          address:
 *            type: string
 *          phone:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          registerDateShamsi:
 *            type: string
 *          birthDayShamsi:
 *            type: string
 *          sportsInsuranceDateShamsi:
 *            type: string
 *          beltDateShamsi:
 *            type: string
 *          coach:
 *            type: string
 *          club:
 *            type: string
 *          belt:
 *            type: string
 *          studentProfile:
 *            description: upload profile student
 *            type: file
 */

/**
 * @swagger
 * /api/v1/students:
 *  post:
 *    summary: register student
 *    tags:
 *      - Student
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/CreateStudent"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateStudent"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateStudent"
 *    responses:
 *      201:
 *        description: created
 */
