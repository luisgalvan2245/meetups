import { QueryHandler } from "../../../Shared/domain/Bus/QueryBus/QueryHandler"
import { GetMeetupQuery } from "./GetMeetupQuery"
import { Query } from "../../../Shared/domain/Bus/QueryBus/Query"
import { MeetupResponse } from "../MeetupResponse"
import { MeetupId } from "../../domain/ValueObjects/MeetupId"
import { MeetupGetter } from "./MeetupGetter"

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
