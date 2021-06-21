import { IArticle } from '~/types/article.interface';
import { IEntitiesState } from '~/utils/store-entities';

export default function (): IEntitiesState<IArticle> {
    return {
        entities: {}
    };
}
