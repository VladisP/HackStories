export type ListType = 'topstories' | 'newstories' | 'beststories' | 'userstories';

export const isListType = (type: string) =>
    !!(type === 'topstories' || type === 'newstories' || type === 'beststories');
