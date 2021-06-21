<template>
    <tr>
        <td>{{ note.id }}</td>
        <td>{{ note }}</td>
        <td>
            <FormArticle />
        </td>
    </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Inject, Prop, Provide } from 'vue-property-decorator';

import ComponentFormArticle, { TOKEN_FORM_ARTICLE_SERVICE } from '~/components/articles/FormArticle.vue';

import { IScopedNote } from '~/types/scoped-note.interface';

import AbstractEditNoteContextService from '~/services/abstract-edit-note-context.service';
import EditNoteFormService from '~/services/edit-note-form.service';

export const TOKEN_EDIT_NOTE_CONTEXT: string = 'EDIT_NOTE_CONTEXT';

@Component({
    components: {
        FormArticle: ComponentFormArticle
    }
})
export default class ComponentNoteItem extends Vue {
    @Inject(TOKEN_EDIT_NOTE_CONTEXT)
    private editNoteContextService!: AbstractEditNoteContextService;

    @Provide(TOKEN_FORM_ARTICLE_SERVICE)
    private get editNoteFormService(): EditNoteFormService {
        return new EditNoteFormService(this.editNoteContextService, this.note);
    }

    @Prop()
    public readonly note!: IScopedNote;
}
</script>
