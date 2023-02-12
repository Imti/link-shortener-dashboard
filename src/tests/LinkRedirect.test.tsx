import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import LinkRedirect from '../views/LinkRedirect'
import { mockLinkProps } from './fixtures'

describe('<LinkRedirect />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <LinkRedirect {...mockLinkProps} />
        </Router>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
