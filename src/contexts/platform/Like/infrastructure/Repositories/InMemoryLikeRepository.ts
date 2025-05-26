import { MeetupId } from '../../../Meetup/domain/ValueObjects/MeetupId'
import { inMemoryStore } from '../../../Shared/infrastructure/Persistance/InMemoryStore'
import { UserId } from '../../../User/domain/ValueObjects/UserId'
import { Like } from '../../domain/Like'
import { LikeRepository } from '../../domain/LikeRepository'
import { LikeId } from '../../domain/ValueObjects/LikeId'

export class InMemoryLikeRepository implements LikeRepository {
  private static likes: Like[] = inMemoryStore.getLikes()

  async save(like: Like): Promise<void> {
    InMemoryLikeRepository.likes.push(like)
  }

  async findById(id: LikeId): Promise<Like | null> {
    return InMemoryLikeRepository.likes.find(like => like.id.equals(id)) || null
  }

  async findByMeetupId(meetupId: MeetupId): Promise<Like[]> {
    return InMemoryLikeRepository.likes.filter(like =>
      like.meetupId.equals(meetupId)
    )
  }

  async findByUserId(userId: UserId): Promise<Like[]> {
    return InMemoryLikeRepository.likes.filter(like =>
      like.userId.equals(userId)
    )
  }

  async findByMeetupAndUser(
    meetupId: MeetupId,
    userId: UserId
  ): Promise<Like | null> {
    return (
      InMemoryLikeRepository.likes.find(
        like => like.meetupId.equals(meetupId) && like.userId.equals(userId)
      ) || null
    )
  }

  async delete(id: LikeId): Promise<void> {
    InMemoryLikeRepository.likes = InMemoryLikeRepository.likes.filter(
      like => !like.id.equals(id)
    )
  }
}
