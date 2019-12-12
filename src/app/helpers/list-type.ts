export type ListType = 'topstories' | 'newstories' | 'beststories' | 'userstories' | 'favoritestories';

export const isListType = (type: string) =>
    !!(type === 'topstories' || type === 'newstories' || type === 'beststories');
