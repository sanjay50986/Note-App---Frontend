import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Model from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNote from '../../assets/Add-note.svg'
import NoData from '../../assets/No-Data.svg'



const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [isSearch, setIsSearch] = useState(false)

  const naviagte = useNavigate()



  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }


  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        naviagte("/login")
      }
    }
  };


  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes)
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");

    }
  }


  const deletNote = async (data) => {
    const noteId = data._id

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully")
        getAllNotes()
      }


    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occurred. Please try again.");

      }
    }
  }

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      })

      console.log(response.data.notes);


      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }


  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {

      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note update Successfully")
        getAllNotes()
      }

    } catch (error) {
      console.log(error);

    }



  }


  useEffect(() => {
    getUserInfo()
    getAllNotes()
  }, [])



  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
      <div className='container mx-auto'>
        {allNotes.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
          {allNotes.map((item, index) => (

            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => { handleEdit(item) }}
              onDelete={() => { deletNote(item) }}
              onPinNote={() => {updateIsPinned(item) }}
            />
          ))}

        </div>) : (
          <EmptyCard
            imgSrc={isSearch ? NoData : AddNote}
            message={isSearch ? `Oops! No notes found matching your search.`
              : `Start creating your first note! Click the 'Add' button to join down your
                                thoughts, ideas, and reminders. let's get started!`}
          />
        )}
      </div>

      <button className=' w-16 h-16 flex items-center rounded-2xl justify-center bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", date: null })
      }}>
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Model
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
        }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}

        />

      </Model>

      <Toast
        isShown={setShowToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home
