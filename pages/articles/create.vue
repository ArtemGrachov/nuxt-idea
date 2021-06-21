<template>
    <div>
        <FormArticle />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'nuxt-property-decorator';

import CreateArticleFormService from '~/services/create-article-form.service';
import ComponentFormArticle, { TOKEN_FORM_ARTICLE_SERVICE } from '~/components/articles/FormArticle.vue';

@Component({
    components: {
        FormArticle: ComponentFormArticle
    }
})
export default class PageNotes extends Vue {
    @Provide(TOKEN_FORM_ARTICLE_SERVICE)
    private get createArticleFormService(): CreateArticleFormService {
        return new CreateArticleFormService(this.$store);
    }
}
</script>
