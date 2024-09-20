import { IResponse, IModelItem } from '@/types'
import { useDispatch, useSelector } from 'react-redux'
import { getModels, setError } from '@stores/ModelStores'
import type { ThunkDispatch } from '@reduxjs/toolkit'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/stores'
import { useEffect, useState } from 'react'
import PageLoader from '@/components/PageLoader'
import SomethingIsWrong from '@/components/SomethingIsWrong'

export default function Dashboard () {
  const [modelList, setModelList] = useState<IModelItem[]>([])

  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch()

  const { loading, error } = useSelector((state: RootState) => state.discover)

  useEffect(() => {
    dispatch(getModels())
      .then(({ meta, payload }) => {
        if (meta.requestStatus === 'rejected') return dispatch(setError(true))

        const { data } = payload as IResponse<IModelItem[]>

        setModelList((prevData) => [...prevData, ...data])
        // setHasMore(data.length > 0);
      })
  // }, [dispatch, page])
  }, [dispatch])

  if (loading && modelList.length === 0) return <PageLoader/>

  if (error) return <SomethingIsWrong/>

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <span className="text-2xl font-bold">Find Your Creative 3D Models</span>

      {modelList.map((model) => (
        <model-viewer 
          src={model.result.model.url} 
          alt={model.prompt}
          key={model.id}
          ar
          camera-controls
          touch-action='pan-y'
        />
      ))}
    </div>
  )
}