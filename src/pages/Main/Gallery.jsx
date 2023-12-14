import MainLayout from '../../layouts/MainLayout'
import { useEffect, useState } from 'react'
import Alert from '../../components/Alert';
import axios from './../../utils/axios'
import { dateIndo, timeJamMenit } from '../../utils/helper';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [journals, setJournals] = useState([])
  const [showAlert, setShowAlert] = useState({ show: false, message: '' })

  useEffect(() => {
    getJournals()
  }, [])

  const getJournals = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`/journal/gallery`)
      setJournals(data.data)
    } catch (error) {
      setShowAlert({ show: true, message: error.response?.data?.message || error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <MainLayout title="GALERI">
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {journals.map((e, idx) => (
                <div key={idx}>
                  <img className="h-auto max-w-full rounded-lg" src={e.image} alt="" />
                </div>
              ))}
            </div>
          </section>
        </main>
      </MainLayout>
    </>
  )
}

export default Gallery