import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import LinkDetail from '../views/LinkDetail'
import { mockLinkProps } from './fixtures'

describe('<LinkDetail />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <LinkDetail {...mockLinkProps} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
