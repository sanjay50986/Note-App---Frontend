import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Model from 'react-modal'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    date: null
  });


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

      <button className=' w-16 h-16 flex items-center rounded-2xl justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", date: null })
      }}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Model
        isOpen={openAddEditModal}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

        <AddEditNotes />

      </Model>
    </>
  )
}

export default Home
