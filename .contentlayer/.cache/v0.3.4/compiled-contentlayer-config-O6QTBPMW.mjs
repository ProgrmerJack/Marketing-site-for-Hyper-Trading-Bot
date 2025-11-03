// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  }
};
var baseFields = {
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  status: {
    type: "enum",
    options: ["draft", "review", "published"],
    default: "draft"
  },
  publishedAt: { type: "date", required: false },
  updatedAt: { type: "date", required: false },
  author: { type: "string", required: false },
  complianceApproved: { type: "boolean", default: false }
};
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    ...baseFields,
    tags: { type: "list", of: { type: "string" }, default: [] }
  },
  computedFields
}));
var ResearchNote = defineDocumentType(() => ({
  name: "ResearchNote",
  filePathPattern: `research/**/*.mdx`,
  contentType: "mdx",
  fields: {
    ...baseFields,
    datasetUrl: { type: "string", required: false },
    downloadLabel: { type: "string", required: false }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, ResearchNote]
});
export {
  BlogPost,
  ResearchNote,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-O6QTBPMW.mjs.map
