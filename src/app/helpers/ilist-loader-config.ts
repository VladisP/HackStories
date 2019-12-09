export type ListType = 'topstories' | 'newstories' | 'beststories' | 'userstories';

export const isListType = (type: string) =>
    !!(type === 'topstories' || type === 'newstories' || type === 'beststories');

export interface IListLoaderConfig {
    listType: ListType;
    loadedStoriesCount: number;
    step?: number;
}
