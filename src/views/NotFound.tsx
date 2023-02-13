import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
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
      <span className="block text-xl md:text-2xl font-semibold text-slate-300 mb-1">
        Page Not Found
      </span>
    </div>
  )
}
