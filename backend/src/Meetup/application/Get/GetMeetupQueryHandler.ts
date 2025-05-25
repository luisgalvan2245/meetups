import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'
import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler'
import { MeetupId } from '../../domain/ValueObjects/MeetupId'
import { MeetupResponse } from '../MeetupResponse'
import { GetMeetup } from './GetMeetup'
import { GetMeetupQuery } from './GetMeetupQuery'

export class GetMeetupQueryHandler
  implements QueryHandler<GetMeetupQuery, MeetupResponse>
{
  constructor(private getter: GetMeetup) {}

  subscribedTo(): Query {
    return GetMeetupQuery
  }

  async handle(query: GetMeetupQuery): Promise<MeetupResponse> {
    const meetup = await this.getter.run(new MeetupId(query.id))
    return meetup.toPrimitives()
  }
}
