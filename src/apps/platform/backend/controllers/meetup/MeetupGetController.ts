import { Route, Tags, Get, Path, Response } from '@tsoa/runtime'

import { ListMeetupsQuery } from '../../../../../contexts/platform/meetup/application/list/ListMeetupsQuery'
import { GetMeetupQuery } from '../../../../../contexts/platform/meetup/application/get/GetMeetupQuery'
import { MeetupResponse } from '../../../../../contexts/platform/meetup/application/MeetupResponse'
import { container } from '../../../../../contexts/platform/shared/infrastructure/dependencies/container'
import { QueryBus } from '../../../../../contexts/platform/shared/domain/query/QueryBus'

@Route('meetups')
@Tags('Meetups')
export class MeetupGetController {
  constructor(private bus: QueryBus = container.meetup.queryBus) {}

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
