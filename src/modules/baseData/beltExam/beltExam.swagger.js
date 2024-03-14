/**
 * @swagger
 * tags:
 *  name: BeltExam
 *  description: belt exam
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateBeltExam:
 *        type: object
 *        required:
 *          - name
 *          - genders
 *          - belts
 *          - eventDate
 *          - registerDate
 *        properties:
 *          name:
 *            type: string
 *            default: آزمون دوره 280
 *          description:
 *            type: string
 *          eventPlace:
 *            type: array
 *          genders:
 *            type: array
 *            items:
 *              type: string
 *              enum: ["آقایان" , "بانوان"]
 *          belts:
 *            type: array
 *            default: [6554f05818363411a986bbdd,6554f09118363411a986bbe0,6554f09518363411a986bbe3,6554f0a418363411a986bbe6,6554f0a718363411a986bbe9,6554f0ba18363411a986bbec,6554f0c118363411a986bbef]
 *          eventDate:
 *            type: string
 *            default: 1402/05/6
 *          registerDate:
 *            type: string
 *            default: 1402/05/6
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UpdateBeltExam:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            default: آزمون دوره 280
 *          description:
 *            type: string
 *          eventPlace:
 *            type: array
 *          genders:
 *            type: array
 *            items:
 *              type: string
 *              enum: ["آقایان" , "بانوان"]
 *          belts:
 *            type: array
 *            default: [6554f05818363411a986bbdd,6554f09118363411a986bbe0,6554f09518363411a986bbe3,6554f0a418363411a986bbe6,6554f0a718363411a986bbe9,6554f0ba18363411a986bbec,6554f0c118363411a986bbef]
 *          eventDate:
 *            type: string
 *            default: 1402/05/6
 *          registerDate:
 *            type: string
 *            default: 1402/05/6
 */

/**
 * @swagger
 * /api/v1/belt-exams:
 *  post:
 *    summary: create belt exam
 *    tags:
 *      - BeltExam
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/CreateBeltExam"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/CreateBeltExam"
 *    responses:
 *      201:
 *        description: created
 */

/**
 * @swagger
 * /api/v1/belt-exams:
 *  get:
 *    summary: get all belt exams
 *    tags:
 *      - BeltExam
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/belt-exams/{id}:
 *  put:
 *    summary: update belt exams
 *    tags:
 *      - BeltExam
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: "#/components/schemas/UpdateBeltExam"
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UpdateBeltExam"
 *    responses:
 *      200:
 *        description: success
 */

/**
 * @swagger
 * /api/v1/belt-exams/{id}:
 *  get:
 *    summary: get by id age group
 *    tags:
 *      - BeltExam
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
 * /api/v1/belt-exams/{id}:
 *  delete:
 *    summary: delete age group
 *    tags:
 *      - BeltExam
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 */
