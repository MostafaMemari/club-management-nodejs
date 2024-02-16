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
 *          - gender
 *          - club
 *          - coach
 *        properties:
 *          firstName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Mostafa
 *          lastName:
 *            type: string
 *            description : min length 2 - max length 50
 *            default: Memari
 *          nationalCode:
 *            type: string
 *            description : length 10
 *            default: 4900782343
 *          belt:
 *            type: string
 *          beltDate:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          sportsInsuranceDate:
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
 *          registerDate:
 *            type: string
 *          birthDay:
 *            type: string
 *          coach:
 *            type: string
 *          club:
 *            type: string
 *          studentProfile:
 *            description: upload profile student
 *            type: file
 *
 *
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
 *          nationalCode:
 *            type: string
 *            description : length 10
 *          belt:
 *            type: string
 *          beltDate:
 *            type: string
 *          memberShipValidity:
 *            type: integer
 *          sportsInsuranceDate:
 *            type: string
 *          gender:
 *            type: string
 *            enum: [مرد,زن]
 *          mobile:
 *            type: string
 *          fatherName:
 *            type: string
 *          address:
 *            type: string
 *          phone:
 *            type: string
 *          registerDate:
 *            type: string
 *          birthDay:
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
 * /api/v1/students:
 *  get:
 *    summary: get all students
 *    tags:
 *      - Student
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/students/{id}/update-profile:
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

/**
 * @swagger
 * /api/v1/students/{id}:
 *  get:
 *    summary: get student by id
 *    tags:
 *      - Student
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: student object id
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/students/{id}:
 *  delete:
 *    summary: remove student by id
 *    tags:
 *      - Student
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: student object id
 *    responses:
 *      200:
 *        description: success
 */
