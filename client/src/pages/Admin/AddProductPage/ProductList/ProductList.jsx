import React from "react";
import Paginate from "~/components/helpers/Paginate/Paginate";
import Product from "~/components/Product/Product";
import LoadingPage from "~/pages/LoadingPage/LoadingPage";
import { useGet } from "~/services/utils/fetch";
import { usePaginate } from "~/customizes/hooks";
const ProductList = (props) => {
  const { fetchResultData, isLoading } = useGet("product");
  console.log(fetchResultData);
  const { itemsPerPageData, pageCount, handlePageOnChange } = usePaginate(
    3,
    fetchResultData.data || []
  );

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="grid">
      <div className="row">
        {itemsPerPageData &&
          itemsPerPageData.map((productInfo) => {
            return (
              <div className="c-4 gutter" key={productInfo.id}>
                <Product {...productInfo} />
              </div>
            );
          })}
      </div>
      <div className="row">
        <div className="c-12 gutter">
          <Paginate
            pageCount={pageCount}
            handlePageOnChange={handlePageOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
