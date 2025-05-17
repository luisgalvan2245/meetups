export class EntityId {
  private constructor(private readonly value: string) {}

  public static create(id: string): EntityId {
    return new EntityId(id)
  }

  public getValue(): string {
    return this.value
  }
}
