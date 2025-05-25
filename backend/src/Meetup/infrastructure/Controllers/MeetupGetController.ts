import { InMemoryMeetupRepository } from '../../../Meetup/infrastructure/Persistance/InMemoryMeetupRepository'
import { MeetupsLister } from '../../application/List/MeetupsLister'
import { MeetupGetter } from '../../application/Get/MeetupGetter'
import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'
import { InMemoryQueryBus } from '../../../Shared/infrastructure/Bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../../../Shared/infrastructure/Bus/QueryBus/QueryHandlers'
import { ListMeetupsQueryHandler } from '../../application/List/ListMeetupsQueryHandler'
import { GetMeetupQueryHandler } from '../../application/Get/GetMeetupQueryHandler'
import { ListMeetupsQuery } from '../../application/List/ListMeetupsQuery'
import { GetMeetupQuery } from '../../application/Get/GetMeetupQuery'
import { MeetupResponse } from '../../application/MeetupResponse'

@Route('meetups')
@Tags('Meetups')
export class MeetupGetController {
  private queryBus: InMemoryQueryBus

  constructor() {
    // TODO: Inject QueryBus
    const repository = new InMemoryMeetupRepository()
    const lister = new MeetupsLister(repository)
    const getter = new MeetupGetter(repository)
    const handlers = new QueryHandlers([
      new ListMeetupsQueryHandler(lister),
      new GetMeetupQueryHandler(getter),
    ])
    this.queryBus = new InMemoryQueryBus(handlers)
  }

  @Get()
  async getAllMeetups(): Promise<MeetupResponse[]> {
    const query = new ListMeetupsQuery()
    return await this.queryBus.ask(query)
  }

  @Get('{id}')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async getMeetupById(@Path() id: string): Promise<MeetupResponse> {
    const query = new GetMeetupQuery({ id })
    return await this.queryBus.ask(query)
  }
}
