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
 *      RegisterStudent:
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
 *          belt:
 *            type: string
 *          beltDateShamsi:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          sportsInsuranceDateShamsi:
 *            type: string
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
 *          registerDateShamsi:
 *            type: string
 *          birthDayShamsi:
 *            type: string
 *          coach:
 *            type: string
 *          club:
 *            type: string
 *          studentProfile:
 *            description: upload profile student
 *            type: file
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateStudent:
 *        type: object
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
 *          belt:
 *            type: string
 *          beltDateShamsi:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          sportsInsuranceDateShamsi:
 *            type: string
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
 *          registerDateShamsi:
 *            type: string
 *          birthDayShamsi:
 *            type: string
 *          coach:
 *            type: string
 *          club:
 *            type: string
 *          studentProfile:
 *            description: upload profile student
 *            type: file
 */

/**
 * @swagger
 * /api/v1/students/register:
 *  post:
 *    summary: register student
 *    tags:
 *      - Student
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/RegisterStudent"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/RegisterStudent"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/RegisterStudent"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/students/{id}/update:
 *  put:
 *    summary: update prifile student
 *    tags:
 *      - Student
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: student object id
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/UpdateStudent"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateStudent"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateStudent"
 *    responses:
 *      200:
 *        description: success
 */