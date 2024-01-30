/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { DROPDOWN_ACTIONS, PAGINATION_DROPDOWN_ACTIONS, POST_ENGAGEMENT_TH_ITEMS } from '../utils/constants';
import PostData from '../types/PostData';
import Pagination from './Pagination';
import { PostsContext } from '../context/PostsContext';

const Table: FC<{posts: Array<PostData>}> = ({posts}) => {

    type CheckboxState = number[];
    const initialCheckboxState: CheckboxState = [];
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState(initialCheckboxState);
    const [isClearSectionVisible, setClearSectionVisible] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');
    const [filteredPosts, setFilteredPosts] = useState<Array<PostData>>(posts);

    useEffect(() => {
        if (isCheck?.length === posts.length) {
            toggleClearSection(true);
        } else {
            toggleClearSection(false);
        }
      }, [isCheck, posts.length]);

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(posts.map(list => list.id));
        if (isCheckAll) {
          setIsCheck([]);
          setClearSectionVisible(false);
        } else {
          setClearSectionVisible(true);
        }
      };
    
    const clearSelection = () => {
    setIsCheck([]);
    toggleClearSection(false);
    };

    const toggleClearSection = (value: boolean) => {
    setIsCheckAll(value);
    setClearSectionVisible(value);
    };

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (!isCheck.includes(Number(id))) {
        setIsCheck([...isCheck, Number(id)]);
    }
    if (!checked) {
        setIsCheck(isCheck.filter(item => item !== Number(id)));
    } 
    };

    const handleDropdownClick = () => {
        (document.activeElement as HTMLElement).blur();
    };

    const filterList = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        setFilter(value);
        setFilteredPosts(posts.filter(item => item.name.includes(value) || value === ''));
    };
    
    return (
        // <PostsContext.Provider value={postsContextDefaultValue}>
        <PostsContext.Provider value={{
            posts,
            filteredPosts,
          }}>
        <div>
            {/* Header for data list */}
            <div className="flex flex-row w-full pt-4">
              <div className="grid flex-grow">
                <h4 className="font-semibold mt-4">Post Engagement Manager</h4>
              </div>
              <div className="grid flex-none">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">10</div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-15">
                    {
                      PAGINATION_DROPDOWN_ACTIONS.map((action, index) => (
                        <li onClick={handleDropdownClick} key={index}><a>{action}</a></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="grid flex-none pr-1">
                <div className='flex items-center'>
                  <input type="text" placeholder="Search..." className="input input-bordered input-sm" value={filter}
                    onChange={filterList} />
                  <div className="-ml-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="grid flex-none">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm m-1">Bulk Actions 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={handleDropdownClick}><a>Delete</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="divider mt-0"></div>
            
            {/* Selection */}
            {
                isClearSectionVisible && (
                    <div className="box-border flex p-4 bg-slate-100 border rounded-lg place-content-center">
                        <div><p className="text-sm">All {filteredPosts.length} Post engagements on this page are selected. </p></div>
                        <div><a className="text-sm ml-4 text-blue-600 font-semibold hover:text-blue-800 no-underline" onClick={clearSelection}>Clear Selection</a></div>
                    </div>
                )
            }
            <table className="table px-2">
                <thead>
                    <tr>
                        <th key="1">
                            <input type="checkbox" className="checkbox" onChange={handleSelectAll} checked={isCheckAll} id="selectAll" />
                        </th>
                        {
                            POST_ENGAGEMENT_TH_ITEMS.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    filteredPosts?.map((item) => (
                    <tr className="hover" key={item.id}>
                        <th><input type="checkbox" className="checkbox" onChange={handleClick} name={item.name} checked={isCheck.includes(item.id)} id={item.id}/></th>
                        <td>{item.name}</td>
                        <td>{item.platform}</td>
                        <td>{item.total_engaged}</td>
                        <td>{item.acquired_subscribers}</td>
                        <td>{item.conversion_rate}</td>
                        <td>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-sm m-1">Actions 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                DROPDOWN_ACTIONS.map((action, index) => (
                                <li onClick={handleDropdownClick} key={index}><a>{action}</a></li>
                                ))
                            }
                            </ul>
                        </div>
                        </td>
                    </tr>
                    )) 
                }
                {
                    filteredPosts.length === 0 && (
                        <tr>
                            <td colSpan={POST_ENGAGEMENT_TH_ITEMS.length+1}>No matching records found</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            {/* Pagination */}
            <Pagination />  
        </div>
        </PostsContext.Provider>
    );
};

export default Table;