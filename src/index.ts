import 'dotenv/config'

import { Server } from './apps/platform/backend/server'

const server = new Server(process.env.PORT || '3000')
server.listen()
