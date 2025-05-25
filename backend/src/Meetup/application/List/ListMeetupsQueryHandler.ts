import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
import { MeetupResponse } from '../MeetupResponse'
import { ListMeetupsQuery } from './ListMeetupsQuery'
import { MeetupsLister } from './MeetupsLister'

export class ListMeetupsQueryHandler
  implements QueryHandler<ListMeetupsQuery, MeetupResponse[]>
{
  constructor(private lister: MeetupsLister) {}

  subscribedTo(): Query {
    return ListMeetupsQuery
  }

  async handle(_query: ListMeetupsQuery): Promise<MeetupResponse[]> {
    const meetups = await this.lister.run()
    return meetups.map(meetup => meetup.toPrimitives())
  }
}
