export const parseFileNameFromUrl = (url: string): string => {
  try {
    const path = new URL(url).pathname;
    const filename = path.split('/').pop();
    return filename || '';
  } catch (e) {
    return ''
  }
}
