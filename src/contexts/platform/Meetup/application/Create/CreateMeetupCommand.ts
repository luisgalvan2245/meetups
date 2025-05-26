import { Command } from '../../../Shared/domain/bus/CommandBus/Command'

type Params = {
  id: string
  title: string
  description: string
  date: Date
  location: string
  imageUrl: string
  organizerId: string
}

export class CreateMeetupCommand extends Command {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly date: Date
  readonly location: string
  readonly imageUrl: string
  readonly organizerId: string

  constructor(params: Params) {
    super()
    this.id = params.id
    this.title = params.title
    this.description = params.description
    this.date = params.date
    this.location = params.location
    this.imageUrl = params.imageUrl
    this.organizerId = params.organizerId
  }
}
