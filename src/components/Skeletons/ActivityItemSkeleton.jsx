import Skeleton from "react-loading-skeleton";

export default function ActivityItemSkeleton() {
  return (
    <>
      <Skeleton height={15} width={60} className="mb-3" />
      <div className="flex space-x-5 mb-5">
        <Skeleton height={128} width={128} />
        <div>
          <Skeleton height={18} width={110} className='mb-1 rounded-lg' />
          <div className='flex gap-3'>
            <Skeleton height={15} width={60} />
            <Skeleton height={15} width={80} />
          </div>
          <Skeleton height={15} width={100} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} width={60} />
        </div>
      </div>
      <div className="flex space-x-5 mb-5">
        <Skeleton height={128} width={128} />
        <div>
          <Skeleton height={18} width={110} className='mb-1 rounded-lg' />
          <div className='flex gap-3'>
            <Skeleton height={15} width={60} />
            <Skeleton height={15} width={80} />
          </div>
          <Skeleton height={15} width={100} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} width={60} />
        </div>
      </div>
    </>
  )
}