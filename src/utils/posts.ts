import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Un post está publicado salvo que sea draft y estemos compilando producción.
 * En dev los borradores (p. ej. el "component gym") se muestran para poder
 * re-visitarlos; en `astro build` desaparecen del listado y de su URL.
 */
export function isPublished(post: BlogPost): boolean {
  return import.meta.env.PROD ? !post.data.draft : true;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.filter(isPublished);
}
