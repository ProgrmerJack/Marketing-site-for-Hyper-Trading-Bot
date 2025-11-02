import { defineDocumentType, makeSource, ComputedFields } from "contentlayer/source-files";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
};

const baseFields = {
  title: { type: "string" as const, required: true },
  description: { type: "string" as const, required: true },
  status: {
    type: "enum" as const,
    options: ["draft", "review", "published"],
    default: "draft",
  },
  publishedAt: { type: "date" as const, required: false },
  updatedAt: { type: "date" as const, required: false },
  author: { type: "string" as const, required: false },
  complianceApproved: { type: "boolean" as const, default: false },
};

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    ...baseFields,
    tags: { type: "list", of: { type: "string" }, default: [] },
  },
  computedFields,
}));

export const ResearchNote = defineDocumentType(() => ({
  name: "ResearchNote",
  filePathPattern: `research/**/*.mdx`,
  contentType: "mdx",
  fields: {
    ...baseFields,
    datasetUrl: { type: "string", required: false },
    downloadLabel: { type: "string", required: false },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, ResearchNote],
});
