import { useNavigate } from 'react-router-dom'
import { Link, toReadableDate } from '../utils'
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa'

export default function LinkDetail(props: Link) {
  const { shortened_uri, uri, count, created_date } = props
  const navigate = useNavigate()

  return (
    <div>
      <span
        className="flex items-center text-left text-sm text-slate-400 mb-4 p-2 cursor-pointer hover:underline"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft size="10px" className="mr-1" />
        back to all links
      </span>
      <div className="py-16 mb-4">
        <span className="block text-xl md:text-2xl font-semibold text-slate-300 mb-1">
          Shortened URL
        </span>
        <a
          className="text-xl md:text-3xl font-extrabold text-slate-600 flex items-center justify-center hover:underline"
          href={shortened_uri}
          target="_blank"
          rel="noreferrer"
        >
          {shortened_uri}
          <FaExternalLinkAlt size="20" className="ml-2" />
        </a>
      </div>
      <div className="grid grid-rows-3 sm:grid-rows-1 grid-flow-cols md:grid-cols-3 gap-4">
        <div className="py-12 bg-slate-100 rounded-xl">
          <span className="block text-md md:text-xl font-extrabold text-slate-300 mb-1">
            Times visited
          </span>
          <span className="text-2xl md:text-3xl font-semibold text-slate-600">
            {count}
          </span>
        </div>
        <div className="py-12 bg-slate-100 rounded-xl">
          <span className="block text-md md:text-xl font-extrabold text-slate-300 mb-1">
            Created on
          </span>
          <span className="text-2xl md:text-3xl font-semibold text-slate-600">
            {toReadableDate(created_date)}
          </span>
        </div>
        <div className="py-12 bg-slate-100 rounded-xl">
          <span className="block text-md md:text-xl font-extrabold text-slate-300 mb-1">
            Original URL
          </span>
          <a
            className="flex items-center justify-center text-2xl md:text-3xl font-semibold text-slate-600 hover:underline"
            href={uri}
            target="_blank"
            rel="noreferrer"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap w-3/4 max-w-[200px] md:max-w-fit">
              {uri}
            </span>
            <FaExternalLinkAlt size="20" className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
