export default function ListVertical({ items }) {
  return (
    <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
      {items.map((item, idx) => (
        <div key={idx} className={`flex flex-col ${idx === 0 ? 'pb-3' : idx === items.length - 1 ? 'pt-3' : 'py-3'}`}>
          <dt className="mb-1 text-gray-500 dark:text-gray-400">{item.label}</dt>
          <dd className="font-semibold">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}