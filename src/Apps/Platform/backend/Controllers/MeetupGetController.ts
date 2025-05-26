import { InMemoryMeetupRepository } from '../../../../Contexts/Platform/Meetup/infrastructure/Persistance/InMemoryMeetupRepository'
import { MeetupsLister } from '../../../../Contexts/Platform/Meetup/application/List/MeetupsLister'
import { MeetupGetter } from '../../../../Contexts/Platform/Meetup/application/Get/MeetupGetter'
import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'
import { InMemoryQueryBus } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/QueryBus/InMemoryQueryBus'
import { QueryHandlers } from '../../../../Contexts/Platform/Shared/infrastructure/Bus/QueryBus/QueryHandlers'
import { ListMeetupsQueryHandler } from '../../../../Contexts/Platform/Meetup/application/List/ListMeetupsQueryHandler'
import { GetMeetupQueryHandler } from '../../../../Contexts/Platform/Meetup/application/Get/GetMeetupQueryHandler'
import { ListMeetupsQuery } from '../../../../Contexts/Platform/Meetup/application/List/ListMeetupsQuery'
import { GetMeetupQuery } from '../../../../Contexts/Platform/Meetup/application/Get/GetMeetupQuery'
import { MeetupResponse } from '../../../../Contexts/Platform/Meetup/application/MeetupResponse'

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
