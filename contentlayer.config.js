"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNote = exports.BlogPost = void 0;
var source_files_1 = require("contentlayer/source-files");
var computedFields = {
    slug: {
        type: "string",
        resolve: function (doc) { return doc._raw.flattenedPath; },
    },
};
var baseFields = {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    status: {
        type: "enum",
        options: ["draft", "review", "published"],
        default: "draft",
    },
    publishedAt: { type: "date", required: false },
    updatedAt: { type: "date", required: false },
    author: { type: "string", required: false },
    complianceApproved: { type: "boolean", default: false },
};
exports.BlogPost = (0, source_files_1.defineDocumentType)(function () { return ({
    name: "BlogPost",
    filePathPattern: "blog/**/*.mdx",
    contentType: "mdx",
    fields: __assign(__assign({}, baseFields), { tags: { type: "list", of: { type: "string" }, default: [] } }),
    computedFields: computedFields,
}); });
exports.ResearchNote = (0, source_files_1.defineDocumentType)(function () { return ({
    name: "ResearchNote",
    filePathPattern: "research/**/*.mdx",
    contentType: "mdx",
    fields: __assign(__assign({}, baseFields), { datasetUrl: { type: "string", required: false }, downloadLabel: { type: "string", required: false } }),
    computedFields: computedFields,
}); });
exports.default = (0, source_files_1.makeSource)({
    contentDirPath: "content",
    documentTypes: [exports.BlogPost, exports.ResearchNote],
});
