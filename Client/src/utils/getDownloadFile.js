export const extractId = (url) => {
    console.log(url);
    var parts = url.match(/\/d\/(.+)\//);
    if (parts == null || parts.length < 2) {
      return url;
    } else {
      return parts[1];
    }
  }