import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
import { MeetupResponse } from '../MeetupResponse'
import { ListMeetup } from './ListMeetup'
import { ListMeetupsQuery } from './ListMeetupsQuery'

export class ListMeetupsQueryHandler
  implements QueryHandler<ListMeetupsQuery, MeetupResponse[]>
{
  constructor(private lister: ListMeetup) {}

  subscribedTo(): Query {
    return ListMeetupsQuery
  }

  async handle(_query: ListMeetupsQuery): Promise<MeetupResponse[]> {
    const meetups = await this.lister.run()
    return meetups.map(meetup => meetup.toPrimitives())
  }
}
