import { useEffect } from 'react'
import { Link } from '../utils'

export default function LinkRedirect(props: Link) {
  const { uri, id } = props

  useEffect(() => {
    const links = JSON.parse(window.localStorage.getItem('links')!)
    const index = links.findIndex((link: Link) => link.id === id)

    // increment count on the selected link
    const updatedLink = { ...links[index], count: links[index].count + 1 }

    // reconstruct the new links
    const newLinks = [
      ...links.slice(0, index),
      updatedLink,
      ...links.slice(index + 1),
    ]

    window.localStorage.setItem('links', JSON.stringify(newLinks))
  }, [id])

  // TODO Determine if we want this or want to use react router Redirect component
  useEffect(() => {
    window.location.href = uri
  }, [uri])

  return (
    <span className="block text-xl md:text-2xl font-semibold text-slate-300 mb-1">
      Redirecting...
    </span>
  )
}
