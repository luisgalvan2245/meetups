import { Query } from '../../../shared/domain/query/Query'
import { QueryHandler } from '../../../shared/domain/query/QueryHandler'
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
