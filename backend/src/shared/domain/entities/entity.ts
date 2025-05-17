import { EntityId } from "@/shared/domain/value-objects/entity-id"

export abstract class Entity {
  constructor(public readonly id: EntityId) {}
}
