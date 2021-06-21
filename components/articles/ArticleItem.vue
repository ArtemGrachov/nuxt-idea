<template>
    <tr>
        <td>
            <NuxtLink :to="`/articles/${article.id}`">
                {{ article.id }}
            </NuxtLink>
        </td>
        <td>{{ article }}</td>
        <td>
            <NuxtLink :to="`/articles/${article.id}/edit`">
                Edit
            </NuxtLink>
        </td>
    </tr>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { IScopedArticle } from '~/types/scoped-article.interface';

@Component({})
export default class ComponentArticleItem extends Vue {
    @Prop()
    public readonly article!: IScopedArticle;
}
</script>
