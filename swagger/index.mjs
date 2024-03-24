import * as swaggerui from "swagger-ui-express"
import oas from "./openapi.json" assert { type: "json" }
import express from "express"

const app = express()

app.use(swaggerui.serve)
app.get('/api', swaggerui.setup(oas))

app.listen(
	7846, 
	() => {
		console.log('Servidor de documentação online!\nAcesse em:  http://localhost:7846/api')
	}
)
