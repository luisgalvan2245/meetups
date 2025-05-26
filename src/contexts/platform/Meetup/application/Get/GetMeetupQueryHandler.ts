import { Query } from '../../../Shared/domain/bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/bus/QueryBus/QueryHandler'
import { MeetupId } from '../../domain/value-objects/MeetupId'
import { MeetupResponse } from '../MeetupResponse'
import { GetMeetupQuery } from './GetMeetupQuery'
import { MeetupGetter } from './MeetupGetter'

export class GetMeetupQueryHandler
  implements QueryHandler<GetMeetupQuery, MeetupResponse>
{
  constructor(private getter: MeetupGetter) {}

  subscribedTo(): Query {
    return GetMeetupQuery
  }

  async handle(query: GetMeetupQuery): Promise<MeetupResponse> {
    const meetup = await this.getter.run(new MeetupId(query.id))
    return meetup.toPrimitives()
  }
}
