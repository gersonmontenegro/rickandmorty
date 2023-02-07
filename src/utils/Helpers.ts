export const Helpers = {
  getURLParams: (url: string): Record<string, string> => {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const params: Record<string, string> = {};
    let match;
    while ((match = regex.exec(url)) != null) {
      params[match[1]] = match[2];
    }
    return params;
  },
};
