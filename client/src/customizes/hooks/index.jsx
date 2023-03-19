import { useState, useEffect } from "react";

export const useTitle = (content) => {
  useEffect(() => {
    content && (document.title = content);
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debounce, delay]);
};

export const usePaginate = (itemsPerPage, itemList) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = itemList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(itemList.length / itemsPerPage);
  const handlePageOnChange = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemList.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  const paginateData = {
    itemsPerPageData: currentItems,
    pageCount,
    handlePageOnChange,
  };

  return paginateData;
};
