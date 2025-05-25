export abstract class DomainEvent {
  readonly eventId: string
  readonly eventName: string
  readonly aggregateId: string
  readonly occurredOn: Date
  readonly data: Record<string, any>

  constructor(
    eventName: string,
    aggregateId: string,
    data: Record<string, any>
  ) {
    this.eventId = crypto.randomUUID()
    this.eventName = eventName
    this.aggregateId = aggregateId
    this.occurredOn = new Date()
    this.data = data
  }

  toPrimitives(): Record<string, any> {
    return {
      eventId: this.eventId,
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn.toISOString(),
      data: this.data
    }
  }
}
