import { MOCK_ARTICLE_API, MOCK_NOTES_API } from '~/mock/mock-api'
import { IApi } from '~/types/api.interface'

const api: IApi = { articles: MOCK_ARTICLE_API, notes: MOCK_NOTES_API };

export default (ctx: any, inject: (p1: string, p2: any) => void) => {
    inject('api', api);
}
