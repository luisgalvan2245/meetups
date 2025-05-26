import { MeetupId } from '../Meetup/domain/ValueObjects/MeetupId'
import { UserId } from '../User/domain/ValueObjects/UserId'
import { Comment } from './Comment'
import { CommentId } from './ValueObjects/CommentId'

export interface CommentRepository {
  save(comment: Comment): Promise<void>
  findById(id: CommentId): Promise<Comment | null>
  findByMeetupId(meetupId: MeetupId): Promise<Comment[]>
  findByAuthorId(authorId: UserId): Promise<Comment[]>
  delete(id: CommentId): Promise<void>
}
