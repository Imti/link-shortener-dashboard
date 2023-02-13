import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import LinkDetail from './views/LinkDetail'
import LinkRedirect from './views/LinkRedirect'
import { Link, onStorageUpdate, getLinksFromStorage } from './utils'
import NotFound from './views/NotFound'

export default function RoutesTree() {
  const [links, setLinks] = useState(getLinksFromStorage() || [])

  useEffect(() => {
    return onStorageUpdate((updatedLinks: Link[]) => {
      setLinks(updatedLinks)
    })
  }, [links])

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {links.map((link: Link) => {
          return (
            <React.Fragment key={link.id}>
              <Route
                path={`links/${link.id}`}
                element={<LinkDetail {...link} />}
              />
              <Route
                path={link.raw_shortened_path_id}
                element={<LinkRedirect {...link} />}
              />
            </React.Fragment>
          )
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
