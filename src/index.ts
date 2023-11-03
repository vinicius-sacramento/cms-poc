import "dotenv/config"
import express from "express";
// import projects from "./routes/project.routes"
// import contentGroups from "./routes/contentGroup.routes"
import contents from "./routes/content.routes"

import { config } from "./utils/config";

const cors = require('cors')
const port = config.APP_PORT

const app = express()
app.use(cors)
app.use(express.json())
// app.use('/projects', projects)
app.use('/contents', contents)
// app.use('/contentGroups', contentGroups)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})