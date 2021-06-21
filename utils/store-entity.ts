import Vue from 'vue';

export enum EEntityMutations {
  UPSERT_ENTITY = 'upsertEntity'
}

export enum EEntityGetters {
  ENTITY = 'entity'
}

export interface IEntityState<T> {
  entity: T | null
}

export function mutationUpsertEntity<T>(state: IEntityState<T>, payload: T | Partial<T>): void {
  if (state.entity) {
    Vue.set(state, 'entity', { ...state.entity, ...payload });
    return;
  }

  state.entity = payload as T;
}

export function getterEntity<T>(state: IEntityState<T>): T | null {
  return state.entity;
}
