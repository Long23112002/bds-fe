// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { observer } from "mobx-react-lite";
// import {  useEffect, useRef } from "react";
// import { pageFilterStore } from "../../../stores/PageFilterStore";

// const PageRealEstateSearch = () => {
//     const listRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (listRef.current && !listRef.current.contains(event.target as Node)) {
//                 pageFilterStore.setIsOpenSearchSuggest(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

  

//     return (
//         <div  ref={listRef} className={`list-group`}
//             style={{  
//                 display: pageFilterStore.isOpenSearchSuggest ? 'block' : 'none',
//                 width: '500px', position: 'absolute', top: '74%', left: '207px', zIndex: 1000, borderRadius: '4px 4px 4px 4px' }}>
//             <div>
//                 {filteredData.map((item: any, index: number) => (
//                     <label key={index} className="list-group-item border-bottom">
//                         <div className="d-flex align-items-center">
//                             <a style={{
//                                 fontSize: '14px',
//                                 color: '#000',
//                                 textDecoration: 'none',
//                             }} href="#">{item}</a>
//                         </div>
//                     </label>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default observer(PageRealEstateSearch);
