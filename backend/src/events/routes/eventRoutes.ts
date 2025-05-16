import { Router, Request, Response } from "express"
import { EventController } from "../controllers/eventController"

const router = Router()
const eventController = new EventController()

router.get("/", async (req: Request, res: Response) => {
  const result = await eventController.getEvents()
  res.json(result)
})

export default router
