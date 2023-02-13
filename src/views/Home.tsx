import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Link,
  SortType,
  sortLinks,
  ChangeEvent,
  SubmitEvent,
  SortDirection,
  toReadableDate,
  getCreatedDate,
  onStorageUpdate,
  setLinksToStorage,
  getLinksFromStorage,
  generateShortPathId,
} from '../utils'
import {
  FaSort,
  FaSortUp,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaSortDown,
  FaDownload,
  FaExclamationTriangle,
} from 'react-icons/fa'
import csvDownload from 'json-to-csv-export'
import isUrl from 'is-url'
import { v4 as uuidv4 } from 'uuid'

// TODOs
// add 404 page

export default function Home() {
  const navigate = useNavigate()
  const [urlString, setUrlString] = useState('')
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [links, setLinks] = useState(getLinksFromStorage() || [])
  const [sortType, setSortType] = useState(SortType.CREATED)
  const [sortDirection, setSortDirection] = useState(SortDirection.DESCENDING)

  const sortedLinks = sortLinks(links, sortType, sortDirection)

  useEffect(() => {
    return onStorageUpdate((updatedLinks: Link[]) => {
      setLinks(updatedLinks)
    })
  }, [])

  useEffect(() => {
    setLinksToStorage(links)
  }, [links])

  const updateSort = (newSortType: SortType) => {
    if (newSortType !== sortType) {
      setSortType(newSortType)
      setSortDirection(SortDirection.DESCENDING)
    } else {
      // flip the direction
      setSortDirection(
        sortDirection === SortDirection.ASCENDING
          ? SortDirection.DESCENDING
          : SortDirection.ASCENDING
      )
    }
  }

  const handleChange = (e: ChangeEvent): void => {
    setUrlString(e.currentTarget.value)
  }

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault()

    let url

    try {
      url = new URL(urlString)

      if (!isUrl(urlString)) {
        throw new Error(`Invalid URL`)
      }

      const shortPath = generateShortPathId()

      const newLink = {
        id: uuidv4(),
        scheme: url.protocol.slice(0, url.protocol.length - 1), // https: -> https
        path: url.pathname,
        raw_shortened_path_id: shortPath,
        root: url.host,
        shortened_path: `/${shortPath}`,
        shortened_uri: `${window.location.origin}/${shortPath}`,
        uri: urlString,
        count: 0,
        created_date: getCreatedDate(),
      }

      setLinks([newLink, ...links])
      setUrlString('')
      setErrorMessage(null)
    } catch (e: unknown) {
      setErrorMessage('Invalid url, try this: https://sona.stream')
    }
  }

  const showSortArrows = (targetSortType: SortType) => {
    const className = 'inline mb-1 mr-1'

    return sortType === targetSortType ? (
      sortDirection === SortDirection.ASCENDING ? (
        <FaSortUp className={className} />
      ) : (
        <FaSortDown className={className} />
      )
    ) : (
      <FaSort className={className} />
    )
  }

  const handleCSVDownload = (): void => {
    csvDownload({
      data: sortedLinks,
      filename: `URL Shortener Links [sorted by ${sortType.toLowerCase()} ${sortDirection.toLowerCase()}]`,
      delimiter: ',',
      headers: [...Object.keys(links[0])],
    })
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full flex items-center justify-center bg-slate-700 text-white text-sm py-2 font-semibold">
        made with ❤️ by imti |
        <a
          href="https://www.linkedin.com/in/imtimajeed/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={18} className="ml-1" />
        </a>
        <a href="https://twitter.com/imtimaj" target="_blank" rel="noreferrer">
          <FaTwitter size={18} className="ml-1.5" />
        </a>
        <a href="https://github.com/imti" target="_blank" rel="noreferrer">
          <FaGithub size={18} className="ml-1.5" />
        </a>
      </div>
      {/* FORM */}
      <div className="w-full py-16 mb-16 bg-slate-100 rounded-xl mt-[36px]">
        <p className="block text-xl md:text-2xl font-semibold text-slate-400 mb-6">
          Enter a URL to shorten
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="https://www.linkedin.com/in/imtimajeed/"
            className="block my-0 mx-auto sm:inline w-10/12 sm:w-1/2 sm:max-w-md bg-slate-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 sm:mr-4 mb-2 sm:mb-0"
            value={urlString}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-10/12 sm:w-fit rounded-lg bg-blue-500 px-4 py-2 text-white text-sm font-semibold"
          >
            Shorten
          </button>
          {errorMessage ? (
            <p className="text-yellow-600 flex w-full items-center justify-center text-xs sm:text-base mt-2">
              <FaExclamationTriangle className="mr-1" />
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>

      {/* LINKS */}
      <div>
        <div className="pb-4 w-full overflow-auto">
          <span className="float-left text-2xl md:text-3xl font-extrabold text-slate-600">
            Your links
          </span>
          <button
            onClick={handleCSVDownload}
            className="flex items-center justify-center float-right rounded-lg text-blue-500 px-4 py-2 text-sm font-semibold"
          >
            Download CSV
            <FaDownload className="ml-2" />
          </button>
        </div>
        <table className="table-fixed border-collapse w-full text-sm">
          <thead className="top-0 sticky bg-white select-none">
            <tr>
              <th
                onClick={() => updateSort(SortType.CREATED)}
                className="cursor-pointer border-b font-medium p-4 pb-3 text-slate-400 text-left hidden md:table-cell"
              >
                {showSortArrows(SortType.CREATED)}
                Created
              </th>
              <th className="border-b font-medium p-2 md:p-4 pb-3 text-slate-400 text-left">
                Shortened URL
              </th>
              <th
                onClick={() => updateSort(SortType.COUNT)}
                className="cursor-pointer border-b font-medium p-2 md:p-4 pb-3 text-slate-400 text-right sm:text-center"
              >
                {showSortArrows(SortType.COUNT)}
                Visits
              </th>
              <th className="border-b font-medium p-4 pb-3 text-slate-400 text-left hidden sm:table-cell">
                Original URL
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLinks.map((link: Link) => (
              <tr
                key={link.id}
                className="hover:bg-slate-100 cursor-pointer"
                onClick={() => navigate(`/links/${link.id}`)}
              >
                <td className="text-left p-4 hidden md:block">
                  {toReadableDate(link.created_date)}
                </td>
                <td className="text-left p-2 md:p-4">{link.shortened_uri}</td>
                <td className="text-right sm:text-center p-2 md:p-4">
                  {link.count}
                </td>
                <td className="text-left p-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-0 hidden sm:table-cell">
                  {link.uri}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
