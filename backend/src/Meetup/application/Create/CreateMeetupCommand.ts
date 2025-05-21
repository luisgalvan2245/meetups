import { Command } from "../../../Shared/domain/Command"

type CreateMeetupCommandParams = {
  id: string
  title: string
  description: string
  date: Date
  location: string
  imageUrl: string
}

export class CreateMeetupCommand extends Command {
  id: string
  title: string
  description: string
  date: Date
  location: string
  imageUrl: string

  constructor({
    id,
    title,
    description,
    date,
    location,
    imageUrl
  }: CreateMeetupCommandParams) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
  }
}
