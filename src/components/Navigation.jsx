import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faImages, faPersonCircleCheck, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <NavLink
            to="/"
            className="navlink inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={`navlink-icon w-5 h-5 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]`}
            />
          </NavLink>
          <NavLink to="/kegiatan" className="navlink inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon
              icon={faPersonCircleCheck}
              className={`navlink-icon w-5 h-5 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]`}
            />
          </NavLink>
          <div className="flex items-center justify-center">
            <NavLink to="/kegiatan/tambah" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#6246ea] rounded-xl hover:bg-[#5740c7] group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
              <span className="sr-only">New item</span>
            </NavLink>
          </div>
          <NavLink to="/galeri" className="navlink inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon
              icon={faImages}
              className={`navlink-icon w-5 h-5 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]`}
            />
          </NavLink>
          <NavLink to="/profil" className="navlink inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon
              icon={faCircleUser}
              className={`navlink-icon w-5 h-5 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]`}
            />
          </NavLink>
        </div>
      </div>
      {/* <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]">Beranda</span>
          </button>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon icon={faPersonCircleCheck} className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]">Kegiatan</span>
          </button>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon icon={faImages} className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]">Galeri</span>
          </button>
          <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <FontAwesomeIcon icon={faCircleUser} className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]" />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-active:text-[#6246ea]">Profil</span>
          </button>
        </div>
      </div> */}
    </>
  )
}

export default Navigation