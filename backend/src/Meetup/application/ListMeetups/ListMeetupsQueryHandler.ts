import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
import { MeetupResponse } from '../MeetupResponse'
import { ListMeetupsQuery } from './ListMeetupsQuery'
import { MeetupLister } from './MeetupLister'

export class ListMeetupsQueryHandler
  implements QueryHandler<ListMeetupsQuery, MeetupResponse[]>
{
  constructor(private lister: MeetupLister) {}

  subscribedTo(): Query {
    return ListMeetupsQuery
  }

  async handle(_query: ListMeetupsQuery): Promise<MeetupResponse[]> {
    const meetups = await this.lister.run()
    return meetups.map(meetup => meetup.toPrimitives())
  }
}
