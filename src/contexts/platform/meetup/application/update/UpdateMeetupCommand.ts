import { Command } from '../../../shared/domain/command/Command'

type Params = {
  id: string
  title?: string
  description?: string
  date?: Date
  location?: string
  imageUrl?: string
  attendees?: string[]
  tags?: string[]
}

export class UpdateMeetupCommand extends Command {
  readonly id: string
  readonly title?: string
  readonly description?: string
  readonly date?: Date
  readonly location?: string
  readonly imageUrl?: string
  readonly attendees?: string[]
  readonly tags?: string[]

  constructor(params: Params) {
    super()
    this.id = params.id
    this.title = params.title
    this.description = params.description
    this.date = params.date
    this.location = params.location
    this.imageUrl = params.imageUrl
    this.attendees = params.attendees
    this.tags = params.tags
  }
}
