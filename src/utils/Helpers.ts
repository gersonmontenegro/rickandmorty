export const Helpers = {
  getURLParams: (url: string | null): Record<string, string> => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params: Record<string, string> = {};
    let match;
    while ((match = regex.exec(url ?? '')) != null) {
      params[match[1]] = match[2];
    }
    return params;
  },

  getLastNumber: (url: string): string => (url !== null ? url.match(/\d+$/)[0] : ''),
};
