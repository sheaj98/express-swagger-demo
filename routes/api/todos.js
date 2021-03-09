const express = require("express");	
const router = express.Router();

var todosList = [
    {
        id: 1,
        title: "Get Groceries", 
        completed: true
    },
    {
        id: 2,
        title: "Complete SWE4302 Presentation",
        completed: true
    },
    {
        id: 3,
        title: "Present SWE4302 Presentation",
        completed: false
    }
]

/**
 * @swagger
 * /api/todos:
 *   get:
 *     tags:
 *       - TODOs
 *     description: Returns all todos
 *     parameters: 
 *       - name: completed
 *         description: Completed Query Param
 *         in: query
 *         required: false
 *         type: boolean
 *     responses:
 *       200:
 *         description: Sucessfully returns array of todos
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/todo'
 */
router.get('/todos', (req, res) => {

    let completed = req.query.completed || false;

    if (completed) {
        let filteredList = todosList.filter(todo => todo.completed)
        return res.json({
            todosList: filteredList
        })
    }

    return res.json({
        todosList
    })
})


/**
 * @swagger
 * /api/todos:
 *   post:
 *     tags:
 *       - TODOs
 *     description: Creates a new todo
 *     parameters:
 *       - name: todo
 *         description: TODO Object
 *         in: body
 *         required: true
 *         schema:          
 *           $ref: '#/components/schemas/todo'
 *     responses:
 *       201:
 *         description: Sucessfully created new todo
 *         schema:
 *           $ref: '#/components/schemas/todo'
 *       400:
 *         description: Bad Request Body
 */
router.post('/todos', (req, res) => {
    var title = req.body.title;
    var completed = req.body.completed;

    if (title && completed) {
        let todo = {
            title,
            completed
        }
        todosList.push(todo);
        return res.status(201).json(todo);
    } else {
        return res.status(400).send("Bad Request Body");
    }
})

/**
 * @swagger
 * /api/todos/{todoId}:
 *   get:
 *     tags:
 *       - TODOs
 *     description: Gets the TODO specified by todoId
 *     parameters:
 *       - name: todoId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucessfully got TODO with ID todoId
 *         schema:
 *           $ref: '#/components/schemas/todo'
 *       404:
 *         description: TODO Not Found
 */
router.get('/todos/:todoId', (req, res) => {
    let todoId = req.params.todoId;
    let todo = todosList.find(td => td.id === todoId);

    if (todo) {
        return res.json(todo);
    } else {
        return res.status(404).send(`TODO with ID ${todoId} was not found.`);
    }
})

/**
 * @swagger
 * /api/todos/{todoId}:
 *   put:
 *     tags:
 *       - TODOs
 *     description: Updates a TODO
 *     parameters:
 *       - name: todo
 *         description: TODO Object
 *         in: body
 *         required: true
 *         schema:          
 *           $ref: '#/components/schemas/todo'
 *       - name: todoId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucessfully updated todo
 *         schema:
 *           $ref: '#/components/schemas/todo'
 *       400:
 *         description: Bad Request Body
 *       404:
 *         description: TODO Not Found
 */
router.put('/todos/:todoId', (req, res) => {
    let todoId = req.params.todoId;
    let todo = todosList.find(td => td.id === todoId);

    let title = req.body.title;
    let completed = req.body.completed

    if (!title || !completed) {
        return res.status(400).send('Bad Request Body')
    }

    if (todo) {
        todo.title = title;
        todo.completed = completed;
        return res.json(todo);
    } else {
        return res.status(404).send(`ToDo with ID ${todoId} was not found.`);
    }
})

module.exports = router;