import { MeetupId } from '../Meetup/domain/ValueObjects/MeetupId'
import { UserId } from '../User/domain/ValueObjects/UserId'
import { Like } from './Like'
import { LikeId } from './ValueObjects/LikeId'

export interface LikeRepository {
  save(like: Like): Promise<void>
  findById(id: LikeId): Promise<Like | null>
  findByMeetupId(meetupId: MeetupId): Promise<Like[]>
  findByUserId(userId: UserId): Promise<Like[]>
  findByMeetupAndUser(meetupId: MeetupId, userId: UserId): Promise<Like | null>
  delete(id: LikeId): Promise<void>
}
