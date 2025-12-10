export default function(eleventyConfig) {
  // Copy passthrough files
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Add missing filters
  eleventyConfig.addNunjucksFilter("dateToRfc3339", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addNunjucksFilter("dateToISO", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addNunjucksFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  eleventyConfig.addNunjucksFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addNunjucksFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection || collection.length === 0) return new Date();
    return new Date(Math.max(...collection.map(item => new Date(item.date || item.data.date).getTime())));
  });

  eleventyConfig.addNunjucksFilter("getPreviousCollectionItem", (collection, currentItem) => {
    const index = collection.indexOf(currentItem);
    return index > 0 ? collection[index - 1] : null;
  });

  eleventyConfig.addNunjucksFilter("getNextCollectionItem", (collection, currentItem) => {
    const index = collection.indexOf(currentItem);
    return index < collection.length - 1 ? collection[index + 1] : null;
  });

  eleventyConfig.addNunjucksFilter("absoluteUrl", (url, baseUrl) => {
    try {
      return new URL(url, baseUrl).toString();
    } catch(e) {
      return baseUrl + url;
    }
  });

  eleventyConfig.addNunjucksFilter("baseUrl", (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.origin;
    } catch(e) {
      return url.split('/').slice(0, 3).join('/');
    }
  });

  eleventyConfig.addNunjucksFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  eleventyConfig.addNunjucksFilter("urlencode", (str) => {
    return encodeURIComponent(str);
  });

  eleventyConfig.addNunjucksFilter("join", (array, separator = ', ') => {
    return array.join(separator);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
