export function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  waitMs: number,
): (...args: Args) => void {
  let timeoutId: number | undefined

  return (...args: Args): void => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => callback(...args), waitMs)
  }
}
