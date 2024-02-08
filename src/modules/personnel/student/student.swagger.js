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
 *      InitialStudentRegister:
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
 *      InitialStudentRegister:
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
 *      CompleteStudentRegister:
 *        type: object
 *        properties:
 *          memberShipValidity:
 *            type: string
 *          belt:
 *            type: string
 *          beltDateShamsi:
 *            type: string
 *          sportsInsuranceDateShamsi:
 *            type: string
 */

/**
 * @swagger
 * /api/v1/students/initial/register:
 *  post:
 *    summary: register student
 *    tags:
 *      - Student
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/students/{id}/initial/register:
 *  put:
 *    summary: update student
 *    tags:
 *      - Student
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/InitialStudentRegister"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/students/{id}/complete/register:
 *  patch:
 *    summary: complete register student
 *    tags:
 *      - Student
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: "#/components/schemas/CompleteStudentRegister"
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CompleteStudentRegister"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CompleteStudentRegister"
 *    responses:
 *      200:
 *        description: success
 */
