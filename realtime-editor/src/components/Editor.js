import React, { useEffect, useState, useRef } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import CodeMirror from 'codemirror';
import 'split-pane-react/esm/themes/default.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import ACTIONS from '../Actions';
import { createRoutesFromChildren } from 'react-router-dom';

const Editor = ({socketRef,roomId}) => {
  const editorRef = useRef(null);
  // const inputRef = useRef(null);

    const [sizes, setSizes] = useState(['40%', '30%', 'auto']);
    const layoutCSS = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    useEffect(() => {
      async function init(){
          editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'),{
              mode: {name: "clike"},
              theme: 'dracula',
              autoCloseTags: true,
              autoCloseBrackets: true,
              lineNumbers:true,
          });
          editorRef.current.on('change', (instance, changes) => {
            console.log('changes', changes);
            const {origin} = changes;
            const code = instance.getValue();
            console.log(code);
            if(origin !== 'setValue'){
              socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                roomId,
                code,
              });
            }
            console.log(code);
          });

          
          // editorRef.current.setValue(`console.log('hello')`);
      }
      init();
    },[]);

    useEffect(() => {
      if (socketRef.current) {
          socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
              if (code !== null) {
                  editorRef.current.setValue(code);
              }
          });
      }

      return () => {
          socketRef.current.off(ACTIONS.CODE_CHANGE);
      };
  }, [socketRef.current]);



  return (

      <div style={{ height: '100vh' }}>
      <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize='40%' maxSize='90%'>
      <div className='px-0'>

      {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0"> */}
      <div className='flex justify-between'>

      <div class="relative rounded-sm ml-1">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Choose</option>
          <option value="Java">Java</option>
          <option value="C++">CPP</option>
          <option value="Python">Python</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <div className='flex gap-1'>
      <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  dark:focus:ring-green-800 font-medium rounded text-sm px-5 py-3 text-center me-2 ">Green</button>
      <button type="button" class=" bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br rounded  w-10  text-center py-3 me-1 "><svg class="h-5 w-11  text-gray-200"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="5 3 19 12 5 21 5 3" /></svg></button>
      
      </div>

      </div>
    

        <textarea class="resize rounded-md bg-red-500" id='realtimeEditor'></textarea>
          {/* <textarea className='' id=""></textarea> */}
      </div>
        </Pane>
        <div className='flex flex-col rounded bg-slate-600 h-full'>
          <div className='flex flex-col m-2 h-1/2'>
            <label className='text-white mb-2' for="Input">Input</label>
            <textarea className='resize-y rounded h-3/4' type="text" class="form-control" aria-label='Last name'></textarea>
          </div>
          <div className='flex flex-col m-2 h-1/2'>
            <label className='text-white mb-2' for="Input">Output</label>
            <textarea className='resize-y rounded h-3/4' type="text" class="form-control" aria-label='Last name'></textarea>
          </div>
        </div>
        
      </SplitPane>
    </div>

  )
}

export default Editor;