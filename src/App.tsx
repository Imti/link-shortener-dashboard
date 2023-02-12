import { useEffect } from 'react'
import Routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import linksJSON from './links.json'
import { setLinksToStorage, getLinksFromStorage } from './utils'

function App() {
  // store data from links.json in local storage
  // if there's no data in there already
  useEffect(() => {
    const links = getLinksFromStorage()
    if (!links || links.length === 0) {
      setLinksToStorage(linksJSON || {})
    }
  }, [])

  return (
    <div className="w-full text-center p-10">
      <Router>
        <Routes />
      </Router>
    </div>
  )
}

export default App
