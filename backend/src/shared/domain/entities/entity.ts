import { EntityId } from "@/shared/domain/valueObjects/entityId"

export abstract class Entity {
  constructor(public readonly id: EntityId) {}
}
