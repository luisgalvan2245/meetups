import { Router, Request, Response } from "express"
import { MeetupController } from "@/meetup/infrastructure/controllers/meetupController"

const router = Router()
const meetupController = new MeetupController()

router.get("/", async (req: Request, res: Response) => {
  const result = await meetupController.getAllMeetups()
  res.json(result)
})

export default router
