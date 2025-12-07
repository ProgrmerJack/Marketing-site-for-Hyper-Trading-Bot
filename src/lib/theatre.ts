import studio from "@theatre/studio";
// @ts-ignore - Theatre.js R3F extension types have package.json exports issue
import extension from "@theatre/r3f/dist/extension";

export function initTheatreStudio() {
    if (process.env.NODE_ENV === "development") {
        studio.initialize();
        studio.extend(extension);
    }
}
