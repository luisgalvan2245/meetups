import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'
import { InMemoryMeetupRepository } from '../../../../contexts/platform/Meetup/infrastructure/persistance/InMemoryMeetupRepository'
import { MeetupsLister } from '../../../../contexts/platform/Meetup/application/List/MeetupsLister'
import { MeetupGetter } from '../../../../contexts/platform/Meetup/application/Get/MeetupGetter'
import { InMemoryQueryBus } from '../../../../contexts/platform/Shared/infrastructure/Bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../../../../contexts/platform/Shared/infrastructure/Bus/QueryBus/QueryHandlers'
import { ListMeetupsQueryHandler } from '../../../../contexts/platform/Meetup/application/List/ListMeetupsQueryHandler'
import { GetMeetupQueryHandler } from '../../../../contexts/platform/Meetup/application/Get/GetMeetupQueryHandler'
import { ListMeetupsQuery } from '../../../../contexts/platform/Meetup/application/List/ListMeetupsQuery'
import { GetMeetupQuery } from '../../../../contexts/platform/Meetup/application/Get/GetMeetupQuery'
import { MeetupResponse } from '../../../../contexts/platform/Meetup/application/MeetupResponse'

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
