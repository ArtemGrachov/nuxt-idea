import Vue from 'vue';
import IDictionary from '~/types/dictionary.interface';

export enum EEntitiesMutations {
    UPSERT_ENTITIES = 'upsertEntities',
    UPSERT_ENTITY = 'upsertEntity',
    DELETE_ENTITY = 'deleteEntity'
}

export enum EEntitiesGetters {
    ENTITIES = 'entities'
}

export interface IEntitiesState<T> {
    entities: IDictionary<T>;
}

function upsertEntity<T>(state: IEntitiesState<T>, entity: T | Partial<T>, primaryKey: string): void {
    // @ts-ignore
    const key: string | number = entity[primaryKey];

    let newEntity: T;

    const oldEntity: T = state.entities[key];

    if (oldEntity) {
        newEntity = { ...oldEntity, ...entity };
    } else {
        newEntity = entity as T;
    }

    Vue.set(state.entities, key, newEntity);
}

export function mutationUpsertEntitiesFactory<T>(primaryKey: string) {
    return function (state: IEntitiesState<T>, payload: Array<T | Partial<T>>): void {
        payload.forEach(entity => upsertEntity(state, entity, primaryKey));
    }
}

export function mutationUpsertEntityFactory<T>(primaryKey: string) {
    return function (state: IEntitiesState<T>, payload: T | Partial<T>): void {
        upsertEntity(state, payload, primaryKey);
    }
}

export function mutationDeleteEntity<T>(state: IEntitiesState<T>, key: string) {
    Vue.set(state.entities, key, null);
}

export function getterEntities<T>(state: IEntitiesState<T>): IDictionary<T> | null {
    return state.entities;
}
