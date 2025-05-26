import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'

import { ListMeetupsQuery } from '../../../../contexts/platform/Meetup/application/List/ListMeetupsQuery'
import { GetMeetupQuery } from '../../../../contexts/platform/Meetup/application/Get/GetMeetupQuery'
import { MeetupResponse } from '../../../../contexts/platform/Meetup/application/MeetupResponse'
import { container } from '../../../../contexts/platform/Shared/infrastructure/dependencies/container'
import { QueryBus } from '../../../../contexts/platform/Shared/domain/Bus/QueryBus/QueryBus'

@Route('meetups')
@Tags('Meetups')
export class MeetupGetController {
  constructor(private bus: QueryBus = container.resolve('QueryBus')) {}

  @Get()
  async getAllMeetups(): Promise<MeetupResponse[]> {
    const query = new ListMeetupsQuery()
    return await this.bus.ask(query)
  }

  @Get('{id}')
  @Response(400, 'Bad Request')
  @Response(404, 'Not Found')
  async getMeetupById(@Path() id: string): Promise<MeetupResponse> {
    const query = new GetMeetupQuery({ id })
    return await this.bus.ask(query)
  }
}
