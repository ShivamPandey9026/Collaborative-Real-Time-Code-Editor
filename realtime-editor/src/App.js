import React from 'react';
import './App.css';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
  <>
    <div>
      <Toaster
      position="top-right"
      toastOptions={{
        success: {
          theme:{
            primary: '#4aed88'
          }
        }
      }}
      >  
      </Toaster>
    </div>
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />}></Route> 
          <Route path="/editor/:roomId" element={<EditorPage />}></Route>
          <Route></Route>                            
          </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;

