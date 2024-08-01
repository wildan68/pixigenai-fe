import { useDispatch, useSelector } from 'react-redux';
import { getDiscover, setError } from '@stores/DiscoverStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useEffect, useState } from 'react';
import { IShutterStockItems } from '@/types';
import PageLoader from '@/components/PageLoader';
import SomethingIsWrong from '@/components/SomethingIsWrong';
import ItemImage from '@/components/ItemImage';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';

export default function Discover () {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const [discoverList, setDiscoverList] = useState<IShutterStockItems[]>([])

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading, error } = useSelector((state: RootState) => state.discover)

  useEffect(() => {
    dispatch(getDiscover({
      page,
      per_page: 20,
    }))
      .then(({ meta, payload }) => {
        if (meta.requestStatus === 'rejected') return dispatch(setError(true))

        const { data } = payload as { data: { data: IShutterStockItems[] } }

        setDiscoverList((prevData) => [...prevData, ...data.data])
        setHasMore(data.data.length > 0);
      })
  }, [dispatch, page])

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);


  if (loading && discoverList.length === 0) return <PageLoader/>

  if (error) return <SomethingIsWrong/>

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <span className="text-2xl font-bold">Find Your Creative Ideas</span>

      <div className="discover-container">
        {discoverList.map((item) => (
          <ItemImage 
            key={item.id} 
            alt={item.description} 
            src={item.assets.huge_thumb.url}
          />
        ))}
      </div>

      { hasMore && <Spinner ref={ref} color="primary"/> }
    </div>
  )
}