import Vue from 'vue';

export enum EFormMutations {
    SET_FORM_FIELD = 'setFormField'
}

export enum EFormGetters {
    FORM_VALUE = 'formValue'
}

export interface IFormState<T> {
    form: T;
}

export interface IMutationSetFormValuePayload {
    field: string;
    value: any;
}

export function mutationSetFormValue<T>(state: IFormState<T>, { field, value }: IMutationSetFormValuePayload): void {
    // @ts-ignore
    Vue.set(state.form, field, value);
}

export function getterFormValue<T>(state: IFormState<T>): T {
    return state.form;
}
