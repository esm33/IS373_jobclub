import eleventyPluginRss from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

export default function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");

  // Configure directories
  eleventyConfig.setLayoutsDirectory("_includes/layouts");
  
  // Add RSS plugin
  eleventyConfig.addPlugin(eleventyPluginRss);

  // Configure markdown-it
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    level: [1, 2, 3, 4]
  });
  
  eleventyConfig.setLibrary("md", md);

  // Add filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("dateToRfc3339", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if(n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  eleventyConfig.addFilter("getAllTags", (collection) => {
    let tagSet = new Set();
    collection.forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", (tags) => {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  // Collections
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/**/*.md").sort((a, b) => {
      return (b.data.order || 0) - (a.data.order || 0);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}
