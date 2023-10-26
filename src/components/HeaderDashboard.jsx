import { BsArrowLeftCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const HeaderDashboard = () => {
  const navigate = useNavigate()

  return (
    <div
      className={`pl-28 sm:pl-64 py-5 bg-main-0 w-full z-30`}
    >
      <BsArrowLeftCircle
        onClick={() => navigate(-1)}
        className="text-3xl text-secondary-0 rounded-full cursor-pointer dark:text-gray-400 dark:bg-gray-800"
      />
    </div>
  )
}

export default HeaderDashboard