export type ListType = 'topStories' | 'newStories' | 'bestStories' | 'userStories';

export interface IListLoaderConfig {
    listType: ListType;
    loadedStoriesCount: number;
    step?: number;
}
