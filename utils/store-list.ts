import Vue from 'vue';

export enum EListMutations {
  SET_LIST = 'setList',
  PUSH_ITEM = 'pushItem',
  UNSHIFT_ITEM = 'unshiftItem',
  CLEAR_LIST = 'clearList',
  DELETE_ITEM = 'deleteItem'
}

export enum EListGetters {
  LIST = 'list'
}

export interface IListState<T> {
  items: Array<T>;
}

export function mutationSetList<T>(state: IListState<T>, payload: Array<T>): void {
  Vue.set(state, 'items', payload);
}

export function mutationsPushItem<T>(state: IListState<T>, payload: T): void {
  Vue.set(state, 'items', [...state.items, payload]);
}

export function mutationsUnshiftItem<T>(state: IListState<T>, payload: T): void {
  Vue.set(state, 'items', [payload, ...state.items]);
}

export function mutationsClearList<T>(state: IListState<T>, payload: T): void {
  Vue.set(state, 'items', []);
}

export function mutationDeleteItem<T>(state: IListState<T>, payload: T): void {
    Vue.set(state, 'items', state.items.filter(i => i !== payload));
  }

export function getterList<T>(state: IListState<T>): Array<T> {
  return state.items;
}
