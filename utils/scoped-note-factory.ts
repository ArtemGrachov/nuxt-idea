import { IArticle } from '~/types/article.interface';
import { IScopedNote } from '~/types/scoped-note.interface';
import EStatus from '~/types/status.enum';

export default function scopedNoteFactory(article: IArticle): IScopedNote {
    return {
        id: article.id,
        editStatus: EStatus.INIT,
        editError: null,
        deleteStatus: EStatus.INIT,
        deleteError: null,
        form: {
            content: ''
        }
    };
}
