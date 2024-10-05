import { Pagination, Table } from "flowbite-react";

export default function MainTable({ columns, items, pagination, setPagination, totalPages }) {
  const onPageChange = (page) => setPagination(props => ({
    ...props,
    currentPage: page
  }));

  return (
    <>
      {pagination &&
        <div className="flex overflow-x-auto justify-between">
          <div className="relative z-0 w-fit group mt-2">
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Tampilkan
            </label>
            <select
              className="block py-2.5 px-0 w-fit text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              onChange={e => setPagination(props => ({
                ...props,
                limitPage: e.target.value
              }))}
              value={pagination.limitPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="relative z-0 w-fit group mt-2">
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cari</label>
            <input
              type="text"
              className="block py-2.5 px-0 w-fit text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
              placeholder="Cari data..."
              onChange={e => setPagination(props => ({
                ...props,
                searchQuery: e.target.value
              }))}
            />
          </div>
        </div>
      }
      <div className="overflow-x-auto border rounded-md">
        <Table hoverable >
          <Table.Head>
            {columns?.map((column, idx) =>
              <Table.HeadCell key={idx}>{column}</Table.HeadCell>
            )}
          </Table.Head>
          <Table.Body className="divide-y">
            {items?.map((item, idxItem) =>
              <Table.Row key={idxItem} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {item.map((subItem, idxSubItem) => (
                  <Table.Cell key={idxSubItem} className="align-top">{subItem}</Table.Cell>
                ))}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      {pagination &&
        <div className="flex overflow-x-auto justify-between items-center">
          <div className="ml-0 rounded-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white">
            {pagination.currentPage} / {totalPages}
          </div>
          <Pagination
            theme={{
              pages: {
                base: "xs:mt-0 mt-0 inline-flex items-center -space-x-px"
              }
            }}
            previousLabel="Sebelumnya"
            nextLabel="Selanjutnya"
            currentPage={pagination.currentPage}
            totalPages={totalPages || 0} onPageChange={onPageChange}
            showIcons
          />
        </div>
      }
    </>
  );
}
