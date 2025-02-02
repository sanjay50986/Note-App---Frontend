import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard title="Metting on 7 April"
            date="3rd Apr 2024"
            content="Metting on 7th April Metting on 7th April"
            tags="#metting"
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPrintNote={() => { }}
          />

          
        </div>
      </div>

      <button className=' w-16 h-16 flex items-center rounded-2xl justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {}}>
        <MdAdd className="text-[32px] text-white" />
      </button>
    </>
  )
}

export default Home
