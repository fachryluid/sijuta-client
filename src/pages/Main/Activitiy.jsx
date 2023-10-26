import { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import Alert from '../../components/Alert';
import axios from './../../utils/axios'
import { dateIndo, timeJamMenit } from '../../utils/helper';
import { Link } from 'react-router-dom';

const Activity = ({ verifyToken }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [journals, setJournals] = useState({})
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })

  useEffect(() => {
    getJournals()
  }, [])

  const getJournals = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/journal/all/${JSON.parse(localStorage.getItem('userData')).uuid}`)
      setJournals(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MainLayout
        title="KEGIATAN" verifyToken={verifyToken}
        isLoading={isLoading}
      >
        {showAlert.show && <Alert color="failure" onDismiss={() => setShowAlert({ show: false })} alertMessage={showAlert.message} />}
        <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
          <ul className="text-sm mb-6 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full">
              <button className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Semua</button>
            </li>
            <li className="w-full">
              <button className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Magang</button>
            </li>
            <li className="w-full">
              <button className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">KKN</button>
            </li>
          </ul>
          <section>
            <div>
              {Object.keys(journals).map((key, idx) => (
                <div key={idx}>
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 font-medium">{dateIndo(key)}</p>
                  </div>
                  {journals[key].map(({ uuid, name, desc, start, end, group, image }, idx) => (
                    <Link to={"/kegiatan/"+uuid} key={idx} className="flex space-x-5 mb-5">
                      <img className="w-32 h-32 rounded-lg border object-cover" src={image} alt="Dokumentasi Aktivitas" />
                      <div>
                        <h3 className="text-xl font-bold mb-1 line-clamp-1">{name}</h3>
                        <div className="mb-1">
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                            {group.fieldwork.type}
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400">
                            {timeJamMenit(start)} - {timeJamMenit(end)}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-3">{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </main>
      </MainLayout>
    </>
  )
}

export default Activity