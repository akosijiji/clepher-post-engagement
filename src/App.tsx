/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from 'react';
import './App.css';
import PostData from './types/PostData';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';
import Table from './components/Table';
import Breadcrumbs from './components/Breadcrumbs';

function App() {

  const postData = [{ 
      id: 1,
      name: 'test 1',
      platform: 'fb',
      total_engaged: '0/0',
      acquired_subscribers: '0',
      conversion_rate: '0%',
    },
    { 
      id: 2,
      name: 'post meta 2',
      platform: 'fb',
      total_engaged: '6/21',
      acquired_subscribers: '9',
      conversion_rate: '0%',
    },
    { 
      id: 3,
      name: 'sample 3',
      platform: 'fb',
      total_engaged: '3/10',
      acquired_subscribers: '5',
      conversion_rate: '0%',
    },
  ];

  const [posts, setPostData] = useState<Array<PostData>>(postData);
  const myModalRef = useRef<HTMLDialogElement>(null);

  const handleDropdownClick = () => {
    (document.activeElement as HTMLElement).blur();
  };
  
  return (
    <div className="App">

      <div className="drawer drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          {/* Navbar */}
          <div className="navbar bg-base-200 border-b">
            <div className="flex-1 pl-2">
              <Breadcrumbs />
              <a className="ml-2">
                <svg className="w-6 h-6 text-gray-800 dark:text-white active:bg-blue-700 hover:bg-blue-600 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9.4-5.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4c0-.6-.4-1-1-1h-2Z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
            <div className="flex-none pr-2">
              <button className="btn btn-md rounded-xl clepher-btn-primary border-transparent hover:bg-blue-500 
                    hover:text-white-800 text-white"
                    onClick={() => myModalRef.current?.showModal()}
                >
                Create New
              </button>
            </div>
        </div>

          {/* container mx-auto */}
          <div className="container mx-auto">

            {/* Data Table */}
            <Table posts={posts} />

            {/* Pagination */}
            <Pagination />  
          
          </div>
          {/* End of Table content */}             
        </div> 
        {/* End of drawer content */}

        <div className="drawer-side border-r">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <Sidebar />
        </div>
        {/* End of drawer side */}
      </div>


      {/* Modal */}
      {
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={myModalRef}>
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Please enter a name</span>
              </div>
              <input type="text" placeholder="Enter text here" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Select a platform</span>
              </div>
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 w-full justify-items-start">Messenger</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                  <li onClick={handleDropdownClick}><a>Messenger</a></li>
                </ul>
              </div>
            </label>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm rounded-lg border-transparent hover:bg-white-500 hover:text-gray-800 text-gray-500"
                >Cancel</button>
              </form>
              <form method="dialog">
                <button className="btn btn-sm rounded-lg clepher-btn-primary border-transparent hover:bg-blue-500 hover:text-white-800 text-white"
                >Confirm</button>
              </form>
            </div>
          </div>
        </dialog>
      }

    </div>
  );
}

export default App;
