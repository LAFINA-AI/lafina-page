declare module 'scrollreveal' {
  export interface ScrollRevealObject {
    reveal(
      selector: string | HTMLElement | NodeListOf<Element>,
      options?: Record<string, unknown>,
      interval?: number
    ): ScrollRevealObject;
    sync(): void;
    destroy(): void;
  }

  function ScrollReveal(options?: Record<string, unknown>): ScrollRevealObject;
  export default ScrollReveal;
}
