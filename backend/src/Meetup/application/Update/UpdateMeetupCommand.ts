import { Command } from "../../../Shared/domain/Command"

type UpdateMeetupCommandParams = {
  id: string
  title?: string
  description?: string
  date?: Date
  location?: string
  imageUrl?: string
}

export class UpdateMeetupCommand extends Command {
  id: string
  title?: string
  description?: string
  date?: Date
  location?: string
  imageUrl?: string

  constructor({
    id,
    title,
    description,
    date,
    location,
    imageUrl
  }: UpdateMeetupCommandParams) {
    super()
    this.id = id
    this.title = title
    this.description = description
    this.date = date
    this.location = location
    this.imageUrl = imageUrl
  }
}
