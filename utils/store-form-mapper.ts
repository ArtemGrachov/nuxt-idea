import { Store } from 'vuex';

export interface IStoreFormMapperOptions {
    store: Store<any>;
    getter: string;
    mutation: string;
    fields: string[];
}

export default function({ store, getter, mutation, fields }: IStoreFormMapperOptions): {} {
    const obj = {};

    fields.forEach((field: string) => {
        Object.defineProperty(
            obj,
            field,
            {
                get: function() {
                    return store.getters[getter][field];
                },
                set: function(value) {
                    if (store.getters[getter][field] === value) {
                        return;
                    }

                    store.commit(
                        mutation,
                        {
                            field,
                            value
                        }
                    );
                }
            }
        );
    });

    return obj;
}
