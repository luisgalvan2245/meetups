import { QueryHandler } from '../../../Shared/domain/Bus/QueryBus/QueryHandler';
import { Query } from '../../../Shared/domain/Bus/QueryBus/Query';
import { MeetupResponse } from '../MeetupResponse';
import { MeetupLister } from './MeetupLister';
import { ListMeetupsQuery } from './ListMeetupsQuery';

export class ListMeetupsQueryHandler implements QueryHandler<ListMeetupsQuery, MeetupResponse[]> {
  constructor(private lister: MeetupLister) {}

  subscribedTo(): Query {
    return ListMeetupsQuery;
  }

  async handle(_query: ListMeetupsQuery): Promise<MeetupResponse[]> {
    const meetups = await this.lister.run();
    return meetups.map(meetup => meetup.toPrimitives());
  }
}
