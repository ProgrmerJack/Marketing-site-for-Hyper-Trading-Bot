/**
 * Minimal shim for GSAP's InertiaPlugin used by ReactBits effects.
 */
const InertiaPlugin = {
  name: "InertiaPlugin",
  init(): boolean {
    return false;
  },
  render(): void {
    // Intentionally empty – the shim disables inertia-based tweens.
  },
};

export { InertiaPlugin };
export default InertiaPlugin;
