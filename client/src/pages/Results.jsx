import React, { useEffect, useState } from 'react'
import { dummyGenerations } from '../assets/assets'
import { Loader2Icon, RefreshCwIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Results = () => {

  const [project, setProjectData] = useState({})
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchProjectData = async () => {
    setTimeout(() => {
      setProjectData(dummyGenerations[0])
      setLoading(false)
    }, 2000);
  }

  useEffect(()=>{
    fetchProjectData()
  }, [])

  return loading ? (
    <div className='h-screen w-full flex items-center justify-center'>
      <Loader2Icon className='animate-spin text-indigo-500 size-9'/>
    </div>
  ) : (
    <div className='min-h-screen text-white p-6 md:p-12 mt-20'>
      <div className='max-w6xl mx-auto'>
        <header className='flex justify-between items-center mb-8 px-8'>
          <h1 className='text-2xl md:text-3xl font-medium'>Generation Result</h1>
          <Link className='flex items-center gap-2 text-sm btn-secondary'>
            <RefreshCwIcon className='w-4 h-4'/>
            <p className='max-sm:hidden'>New Generation</p>
          </Link>
        </header>

      </div>
    </div>
  )
}

export default Results