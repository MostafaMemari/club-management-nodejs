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
 *            default: آزمون دوره 556
 *          description:
 *            type: string
 *          eventPlace:
 *            type: string
 *          genders:
 *            type: array
 *            items:
 *              type: string
 *              enum: ["آقایان" , "بانوان"]
 *          belts:
 *            type: array
 *            default: [6554f05818363411a986bbdd,6554f09518363411a986bbe3]
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
