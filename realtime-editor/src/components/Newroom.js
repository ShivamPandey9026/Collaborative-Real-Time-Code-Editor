import React, { useState } from "react";
import {v4 as uuid} from 'uuid';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditorPage from "../pages/EditorPage";

function Newroom() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const generateRoomId = (e) =>{
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    // toast.success('created a new room');
  };

    
    const joinRoom = () =>{
      if(!roomId || !username){
        toast.error('Room Id & username is requird');
        return;
      }
      //Redirect
      navigate(`/editor/${roomId}`,{
        state:{
          username,
        },
      });
      toast.success("Room is created");
    };

    const handleInputEnter = (e) =>{
       
        if(e.code === 'Enter'){
          joinRoom();
        }
    };

    return ( 
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="bg-slate-500">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mt-4 mx-auto h-14 w-auto "
            src="/code-sync.png"
            alt="Your Company"
          />
          <h4 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-stone-200">
            Page Invitation ROOM ID
          </h4>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="roomId" className="block text-sm font-medium leading-6 text-gray-900">
                ROOM ID
              </label>
              <div className="mt-2">
                <input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  
                  type="text"
                  placeholder="Enter Room Id"                  
                  onKeyUp={handleInputEnter}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:px-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="roomId" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:px-2"
                  onKeyUp={handleInputEnter}
                />
              </div>
            </div>


            <div className="flex  justify-end rounded-md ">
              <button
                type="joinRoom"
                className="flex w-32 justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={joinRoom}
              >
                Join
              </button>
            </div>
          </form>
        <div className="block w-full">
          <p className="mt-5 mb-5 text-center text-sm text-gray-100">
            If you don't have an invite, Create {' '}
            
            <span className="font-semibold  leading-6  hover:text-indigo-400"
                  onClick={generateRoomId}
            >      
              New ROOM
            </span>
            
          </p>
          </div>
        </div>
        </div>
      </div>
   
     );
}

export default Newroom;