type SplitTextTarget = string | Element | null | undefined;

interface SplitTextOptions {
  type?: string;
  absolute?: boolean;
  linesClass?: string;
}

/**
 * Lightweight client-side shim for the proprietary GSAP SplitText plugin.
 * It keeps the original content intact while exposing the minimal API surface
 * that @appletosolutions/reactbits expects (words/lines/chars collections and
 * a revert() method).
 */
export class SplitText {
  element: HTMLElement | null;
  originalHTML: string;
  words: HTMLElement[];
  chars: HTMLElement[];
  lines: HTMLElement[];

  constructor(target: SplitTextTarget, _options?: SplitTextOptions) {
    void _options;
    if (typeof document === "undefined") {
      this.element = null;
      this.originalHTML = "";
      this.words = [];
      this.chars = [];
      this.lines = [];
      return;
    }

    this.element =
      typeof target === "string"
        ? (document.querySelector<HTMLElement>(target) ?? null)
        : (target as HTMLElement | null);

    this.originalHTML = this.element?.innerHTML ?? "";

    if (!this.element) {
      this.words = [];
      this.chars = [];
      this.lines = [];
      return;
    }

    // Without the real SplitText plugin we fall back to the element itself so
    // downstream animation logic can continue to run (albeit without the granular
    // splitting effects).
    this.words = [this.element];
    this.chars = [this.element];
    this.lines = [this.element];
  }

  revert() {
    if (this.element && typeof this.originalHTML === "string") {
      this.element.innerHTML = this.originalHTML;
    }
  }
}

export default SplitText;
