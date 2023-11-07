import "dotenv/config"
import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true
})

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
})

// import projects from "./routes/project.routes"
// import contentGroups from "./routes/contentGroup.routes"
import  { contentRoutes } from "./routes/content.routes"
import { config } from "./utils/config";

const port = config.APP_PORT

// app.use('/projects', projects)
// app.use('/contentGroups', contentGroups)
contentRoutes(app)

app.listen({
  host: '0.0.0.0',
  port: port ? Number(port) : 3000
}, () => {
  console.log(`Example app listening on port ${port}`)
})