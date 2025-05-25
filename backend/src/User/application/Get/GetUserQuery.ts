import { Query } from '../../../Shared/domain/Query'

export class GetUserQuery implements Query {
  readonly id: string

  constructor(params: { id: string }) {
    this.id = params.id
  }
}
