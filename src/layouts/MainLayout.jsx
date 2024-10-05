import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from '../utils/axios'
import { Link } from 'react-router-dom';

const MainLayout = ({ children, title }) => {
  const [showAlert, setShowAlert] = useState(undefined);

  useEffect(() => {
    axios.get(`/check/password`)
      .then(response => {
        if (response.data.warning == 'PASSWORD_INSECURE') {
          setShowAlert({
            color: 'warning',
            icon: HiInformationCircle,
            content: <div>
              <span className="font-bold">Peringatan! </span>
              <span>Password anda tidak aman. Segera ganti password anda </span>  
              <Link to="/profil/ganti-password" className='font-bold underline'>disini</Link>.
            </div>
          })
        }
      })
  }, [])

  return (
    <>
      {showAlert &&
        <Alert
          className='rounded-none'
          color={showAlert.color}
          icon={showAlert.icon}
          onDismiss={() => setShowAlert(undefined)}
        >
          {showAlert.content}
        </Alert>
      }
      <Header title={title} />
      {children}
      <Navigation />
    </>
  )
}

export default MainLayout
