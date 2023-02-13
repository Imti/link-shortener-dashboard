import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import NotFound from '../views/NotFound'

describe('<NotFound />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <NotFound />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
