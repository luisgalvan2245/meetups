import { Command } from "../../../../Shared/Domain/Command"

type Params = {
  id: string
  title: string
  description: string
  date: Date
  location: string
  imageUrl: string
}

export class CreateMeetupCommand extends Command {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly date: Date
  readonly location: string
  readonly imageUrl: string

  constructor({ id, title, description, date, location, imageUrl }: Params) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
  }
}
