import { Service } from "fastify-decorators"
import MeetupService from "@/meetup/application/services/meetupService"
import MockMeetupRepository from "@/meetup/infrastructure/repositories/mockMeetupRepository"

@Service()
export default class MeetupFactory {
  private static meetupRepository = new MockMeetupRepository()
  private static meetupService: MeetupService | null = null

  static getMeetupService(): MeetupService {
    if (!this.meetupService) {
      this.meetupService = new MeetupService(this.meetupRepository)
    }
    return this.meetupService
  }
}
