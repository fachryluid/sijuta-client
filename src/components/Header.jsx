import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom';
import logo from './../assets/logo.svg';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button"
      onClick={() => navigate(-1)} 
      className="text-white p-2"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  )
}

const Header = ({title, backButton, rightButtonLink, rightButtonIcon}) => {
  return (
    <div className="w-full bg-[#6246ea] px-5 py-3">
      <div className={`max-w-lg mx-auto flex ${backButton ? 'justify-between' : 'justify-center'} items-center`}>
        {backButton && <BackButton />}
        <h1 className="text-[#fffffe] font-bold text-center p-2">
          {title ?? <img src={logo} alt="S I J U P R I" className="h-6" />}
        </h1>
        {rightButtonLink && 
          <Link to={rightButtonLink} className="text-white p-2">
            {rightButtonIcon}
          </Link>
        }
      </div>
    </div>
  )
}

export default Header