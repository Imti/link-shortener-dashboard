import { format as formatDate, parse as parseDate } from 'date-fns'

export const LOCAL_STORAGE_LINKS_KEY = 'links'

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
export type SubmitEvent = React.FormEvent<HTMLFormElement>

export interface Link {
  id: string
  scheme: string
  path: string
  raw_shortened_path_id: string
  root: string
  shortened_path: string
  shortened_uri: string
  uri: string
  count: number
  created_date: string
}

export enum SortType {
  COUNT = 'count',
  CREATED = 'created',
}

export enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export function getLinksFromStorage() {
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_LINKS_KEY)!)
}

export function getUnparsedLinksFromStorage() {
  return window.localStorage.getItem(LOCAL_STORAGE_LINKS_KEY)!
}

export function setLinksToStorage(data: object) {
  const stringifiedData = JSON.stringify(data)

  if (getUnparsedLinksFromStorage() !== stringifiedData) {
    window.localStorage.setItem(LOCAL_STORAGE_LINKS_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('storage'))
  }
}

export function onStorageUpdate(cb: Function) {
  const onLinksChange = () => {
    cb(getLinksFromStorage)
  }

  window.addEventListener('storage', onLinksChange)

  return () => {
    window.removeEventListener('storage', onLinksChange)
  }
}

export function toReadableDate(dateString: string): string {
  const date = parseDate(dateString, 'yyyy-MM-dd', new Date())
  return formatDate(date, 'MMMM do yyy')
}

export function generateShortPathId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function getCreatedDate(): string {
  return formatDate(new Date(), 'yyyy-MM-dd')
}

export function toDateValue(readableDate: string): number {
  return new Date(readableDate).valueOf()
}

export function sortLinks(
  links: Link[],
  sortType = SortType.CREATED,
  sortDirection = SortDirection.DESCENDING
): Link[] {
  switch (sortType) {
    case SortType.CREATED:
      return links.sort((l1, l2) =>
        sortDirection === SortDirection.DESCENDING
          ? toDateValue(l2.created_date) - toDateValue(l1.created_date)
          : toDateValue(l1.created_date) - toDateValue(l2.created_date)
      )
    case SortType.COUNT:
    default:
      return links.sort((l1, l2) =>
        sortDirection === SortDirection.DESCENDING
          ? l2.count - l1.count
          : l1.count - l2.count
      )
  }
}
