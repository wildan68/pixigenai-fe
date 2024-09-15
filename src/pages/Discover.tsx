import { useDispatch, useSelector } from 'react-redux';
import { getDiscover, setError } from '@stores/DiscoverStores';
import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import SomethingIsWrong from '@/components/SomethingIsWrong';
import ItemImage from '@/components/ItemImage';
// import { useInView } from 'react-intersection-observer';
// import { Spinner } from '@nextui-org/react';
import { IResponse, IDiscoverItems } from '@/types';

export default function Discover () {
  // const [page, setPage] = useState(1)
  // const [hasMore, setHasMore] = useState(true)
  // const { ref, inView } = useInView()

  const [discoverList, setDiscoverList] = useState<IDiscoverItems[]>([])

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading, error } = useSelector((state: RootState) => state.discover)

  useEffect(() => {
    dispatch(getDiscover())
      .then(({ meta, payload }) => {
        if (meta.requestStatus === 'rejected') return dispatch(setError(true))

        const { data } = payload as IResponse<IDiscoverItems[]>

        setDiscoverList((prevData) => [...prevData, ...data])
        // setHasMore(data.length > 0);
      })
  // }, [dispatch, page])
  }, [dispatch])

  // useEffect(() => {
  //   if (inView && hasMore) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [inView, hasMore]);


  if (loading && discoverList.length === 0) return <PageLoader/>

  if (error) return <SomethingIsWrong/>

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <span className="text-2xl font-bold">Find Your Creative 3D Models</span>

      <div className="discover-container">
        {discoverList.map((item) => (
          <ItemImage 
            key={item.id} 
            alt={item.description} 
            src={item.thumb_url}
          />
        ))}
      </div>

      {/* { hasMore && <Spinner ref={ref} color="primary"/> } */}
    </div>
  )
}