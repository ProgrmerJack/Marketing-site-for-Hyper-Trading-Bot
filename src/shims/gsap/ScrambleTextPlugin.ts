/**
 * Minimal shim for GSAP's ScrambleTextPlugin so the ReactBits bundle can load
 * even when premium GSAP plugins are unavailable.
 */
const ScrambleTextPlugin = {
  name: "ScrambleTextPlugin",
  init(): boolean {
    // Returning false tells GSAP there's nothing to set up.
    return false;
  },
  render(): void {
    // No-op – real scrambling is not supported in the shim.
  },
};

export { ScrambleTextPlugin };
export default ScrambleTextPlugin;
