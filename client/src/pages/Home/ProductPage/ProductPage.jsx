import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "~/components/helpers/Page/Page";
import FilterBox from "./FilterBox/FilterBox";
import ProductSorting from "./ProductSorting/ProductSorting";
import Paginate from "~/components/helpers/Paginate/Paginate";
import LoadingPage from "~/pages/LoadingPage/LoadingPage";
import { usePaginate } from "~/customizes/hooks";
import { useGet } from "~/services/utils/fetch";

import classNames from "classnames/bind";
import style from "./ProductPage.module.scss";

const cx = classNames.bind(style);

const ProductsWithPaginate = (props) => {
  const navigate = useNavigate();

  const handleSwitchToProductDetailPage = (productInfo) => {
    navigate(`/home/p/${productInfo.product_name}/${productInfo.id}`);
  };

  const { itemsPerPageData, pageCount, handlePageOnChange } = usePaginate(
    9,
    props.productList
  );

  return (
    <>
      <div className="row">
        {itemsPerPageData &&
          itemsPerPageData.map((productInfo, index) => {
            return (
              <div
                className="c-4 gutter"
                key={productInfo.id}
                onClick={(e) => {
                  handleSwitchToProductDetailPage(productInfo);
                }}
              >
                <div className={cx("product-wrapper")}>
                  <div className={cx("product-img-link-wrapper")}>
                    <img
                      src={productInfo.product_imgSrc}
                      alt={productInfo.product_name}
                    />
                  </div>
                  <span className={cx("product-name")}>
                    {productInfo.product_name}
                  </span>
                  <span
                    className={cx("product-price")}
                  >{`From £${productInfo.product_price}`}</span>
                </div>
              </div>
            );
          })}
      </div>
      <div className="row mt-2">
        <div className="c-12 gutter">
          <Paginate
            pageCount={pageCount}
            handlePageOnChange={handlePageOnChange}
          />
        </div>
      </div>
    </>
  );
};

const ProductPage = (props) => {
  const params = useParams();
  const { fetchResultData, isLoading } = useGet(
    `product/by_category_name/${params["name"]}`
  );

  return isLoading ? (
    <LoadingPage />
  ) : (
    <Page title="In stock">
      <section className="page-body grid wide">
        <div className="row mb-4-2">
          <div className="c-12 gutter">
            <FilterBox />
          </div>
        </div>

        <div className="row mb-4-2">
          <div className="c-12 gutter">
            <ProductSorting />
          </div>
        </div>

        <ProductsWithPaginate productList={fetchResultData.data} />
      </section>
    </Page>
  );
};

export default ProductPage;
