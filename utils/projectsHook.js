import { slugify } from '@/utils/functions'

export function projects(item) {
    return {
        link: `/work/${slugify(item.client)}`,
        client: item.client,
        title: item.title,
        date: item.date,
        image: item.image,
        category: item.category,
        tags: item.tags,
        darkText: item.darkText
    }
}