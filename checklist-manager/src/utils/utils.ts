export function generateLocalStorageKeyForList(listIndex: number): string {
    return 'tasks' + listIndex.toString();
}