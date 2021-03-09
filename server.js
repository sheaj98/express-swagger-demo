const express = require('express')		
const app = express()	
const bodyParser = require('body-parser')	
const swaggerJsonDoc = require('swagger-jsdoc')	
const swaggerUI = require('swagger-ui-express')
process.env.PORT = process.env.PORT || 3000
const swaggerOptions = {		
    swaggerDefinition: {			
        info: {				
            title: "Documenting REST API's",				
            description: "This is an implementation of how to document your RESTful API's using SWAGGER",				
            servers: ['http://localhost:3000&#39;']			
        },			
        "components": {				
            "schemas": {					
                "todo": {
                    "type": "object",
                    "required": [
                        "id",
                        "title",
                        "completed"
                    ],						
                    "properties": {	
                        "id": {
                            "type": "integer",
                            "example": "5"
                        },					
                        "title": {								
                            "type": "string",
                            "example": "Get Groceries"							
                        },
                        "completed": {
                            "type": "boolean",
                            "example": false
                        }					
                    }					
                }				
            }			
        }		
    },		
    apis: ['./routes/api/todos.js']	}	
const swaggerDocs = swaggerJsonDoc(swaggerOptions)	
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(bodyParser.urlencoded({
    extended: false	
}))	
app.use(bodyParser.json())	
app.use("/api", require('./routes/api/todos.js'))

app.listen(process.env.PORT, () => {		
    console.log(`Server started on ${process.env.PORT}`)	
})