import { MeetupId } from '../../../Meetup/domain/ValueObjects/MeetupId'
import { InMemoryStore } from '../../../Shared/infrastructure/Persistance/InMemoryStore'
import { UserId } from '../../../User/domain/ValueObjects/UserId'
import { Comment } from '../../domain/Comment'
import { CommentRepository } from '../../domain/CommentRepository'
import { CommentId } from '../../domain/ValueObjects/CommentId'

export class InMemoryCommentRepository implements CommentRepository {
  private store: InMemoryStore

  constructor() {
    this.store = InMemoryStore.getInstance()
  }

  async save(comment: Comment): Promise<void> {
    this.store.getComments().set(comment.id.toString(), comment)
  }

  async findById(id: CommentId): Promise<Comment | null> {
    return this.store.getComments().get(id.toString()) || null
  }

  async findByMeetupId(meetupId: MeetupId): Promise<Comment[]> {
    const comments = Array.from(this.store.getComments().values())
    return comments.filter(comment => comment.meetupId.equals(meetupId))
  }

  async findByAuthorId(authorId: UserId): Promise<Comment[]> {
    const comments = Array.from(this.store.getComments().values())
    return comments.filter(comment => comment.authorId.equals(authorId))
  }

  async delete(id: CommentId): Promise<void> {
    this.store.getComments().delete(id.toString())
  }
}
