import ActivityItemSkeleton from '@/components/Skeletons/ActivityItemSkeleton';
import MainLayout from '@/layouts/MainLayout';
import { FIELDWORK_TYPE } from '@/utils/constants';
import { dateIndo, timeJamMenit } from '@/utils/helper';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const Activity = ({ verifyToken }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [activeTab, setActiveTab] = useState('');
  const { data: journals, isLoading: isLoadingJournals } = useSWR(`/journal/all/${userData?.uuid}?type=${activeTab}`);

  return (
    <MainLayout
      title="KEGIATAN" verifyToken={verifyToken}
    >
      <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
        <ul className="text-sm mb-6 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <button
              className={`inline-block w-full p-4 ${activeTab === '' ? 'text-gray-900 bg-gray-100' : 'bg-white'} rounded-l-lg focus:outline-none`}
              onClick={() => setActiveTab('')}
            >
              Semua
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full p-4 ${activeTab === FIELDWORK_TYPE.MAGANG ? 'text-gray-900 bg-gray-100' : 'bg-white'} focus:outline-none`}
              onClick={() => setActiveTab(FIELDWORK_TYPE.MAGANG)}
            >
              {FIELDWORK_TYPE.MAGANG}
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full p-4 ${activeTab === FIELDWORK_TYPE.KKN ? 'text-gray-900 bg-gray-100' : 'bg-white'} rounded-r-lg focus:outline-none`}
              onClick={() => setActiveTab(FIELDWORK_TYPE.KKN)}
            >
              {FIELDWORK_TYPE.KKN}
            </button>
          </li>
        </ul>
        <section>
          {isLoadingJournals ?
            <ActivityItemSkeleton />
            :
            journals?.data && Object.keys(journals?.data).map((key, idx) => (
              <div key={idx}>
                <div className="mb-3">
                  <p className="text-sm text-gray-500 font-medium">{dateIndo(key)}</p>
                </div>
                {journals?.data[key].map(({ uuid, name, desc, start, end, group, image }, idx) => (
                  <Link to={"/kegiatan/" + uuid} key={idx} className="flex space-x-5 mb-5">
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
            ))
          }
        </section>
      </main>
    </MainLayout>
  )
}

export default Activity