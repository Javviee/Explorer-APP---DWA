import { escapeHtml } from '../utils/format'

const SKELETON_CARD_COUNT = 8

const SKELETON_CARD = `
  <article class="animate-pulse overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
    <div class="h-28 w-full bg-border/60"></div>
    <div class="flex flex-col gap-xs px-md py-md">
      <div class="h-4 w-2/3 rounded bg-border/60"></div>
      <div class="mt-xs h-3 w-full rounded bg-border/40"></div>
      <div class="h-3 w-full rounded bg-border/40"></div>
      <div class="h-3 w-full rounded bg-border/40"></div>
      <div class="mt-sm h-11 w-full rounded-full bg-border/60"></div>
    </div>
  </article>
`

export function renderLoading(): string {
  return Array.from({ length: SKELETON_CARD_COUNT }, () => SKELETON_CARD).join('')
}

export function renderEmpty(query: string): string {
  const trimmedQuery = query.trim()
  const message = trimmedQuery
    ? `No se encontraron países que coincidan con "${escapeHtml(trimmedQuery)}".`
    : 'No se encontraron países que coincidan con los criterios seleccionados.'

  return `
    <p class="col-span-full rounded-2xl border border-border bg-surface px-md py-lg text-center text-text-secondary">
      ${message}
    </p>
  `
}

export function renderError(message: string): string {
  return `
    <div role="alert" class="col-span-full flex flex-col items-center gap-sm rounded-2xl border border-accent/30 bg-accent/10 px-md py-lg text-center text-accent">
      <p>${escapeHtml(message)}</p>
      <button
        type="button"
        id="retry-button"
        class="rounded-full bg-accent px-lg py-sm font-semibold text-white transition-all duration-150 hover:bg-accent/90 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Reintentar
      </button>
    </div>
  `
}
