import * as utils from '../utils'

describe('utils', () => {
  describe('toReadableDate', () => {
    it('should make the date readable', () => {
      expect(utils.toReadableDate('2023-07-01')).toBe('July 1st 2023')
    })
    it('should throw if invalid date passed in', () => {})
  })

  describe('getLinksFromStorage', () => {
    afterEach(() => {
      window.localStorage.removeItem(utils.LOCAL_STORAGE_LINKS_KEY)
    })

    it('should return links from local storage', () => {
      const linkData = [
        { id: 1, name: 'Link 1' },
        { id: 2, name: 'Link 2' },
      ]
      window.localStorage.setItem(
        utils.LOCAL_STORAGE_LINKS_KEY,
        JSON.stringify(linkData)
      )
      const links = utils.getLinksFromStorage()
      expect(links).toEqual(linkData)
    })

    it('should return null when no links are stored in local storage', () => {
      const links = utils.getLinksFromStorage()
      expect(links).toBeNull()
    })
  })

  describe('getUnparsedLinksFromStorage', () => {
    afterEach(() => {
      window.localStorage.removeItem(utils.LOCAL_STORAGE_LINKS_KEY)
    })

    it('returns the value of LOCAL_STORAGE_LINKS_KEY in local storage', () => {
      const expectedValue = '{"link1": "url1", "link2": "url2"}'
      window.localStorage.setItem(utils.LOCAL_STORAGE_LINKS_KEY, expectedValue)

      expect(utils.getUnparsedLinksFromStorage()).toBe(expectedValue)
    })

    it('returns null when no links are stored in local storage', () => {
      expect(utils.getUnparsedLinksFromStorage()).toBeNull()
    })
  })

  describe('setLinksToStorage', () => {
    const data = { test: 'data' }

    afterEach(() => {
      window.localStorage.clear()
      jest.restoreAllMocks()
    })

    it('should store the data in local storage if it is different than the current data', () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent')

      utils.setLinksToStorage(data)

      expect(setItemSpy).toHaveBeenCalledTimes(1)
      expect(setItemSpy).toHaveBeenCalledWith(
        utils.LOCAL_STORAGE_LINKS_KEY,
        JSON.stringify(data)
      )
      expect(window.localStorage.getItem(utils.LOCAL_STORAGE_LINKS_KEY)).toBe(
        JSON.stringify(data)
      )
      expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
    })

    it('should not store the data in local storage or dispatch a storage event if it is the same as the current data', () => {
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
      const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent')

      utils.setLinksToStorage(data)
      utils.setLinksToStorage(data)

      expect(setItemSpy).toHaveBeenCalledTimes(1)
      expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
    })
  })
})
