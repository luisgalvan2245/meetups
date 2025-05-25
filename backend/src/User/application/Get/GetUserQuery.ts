import { Query } from '../../../Shared/domain/Bus/QueryBus/Query'

type Params = {
  id: string
}

export class GetUserQuery extends Query {
  readonly id: string

  constructor({ id }: Params) {
    super()
    this.id = id
  }
}
