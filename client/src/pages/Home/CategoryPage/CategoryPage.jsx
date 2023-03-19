import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Tooltip from "~/components/helpers/Tooltip/Tooltip";
import Button from "~/components/helpers/Button/Button";
import Brands from "./Brands/Brands";
import LoadingPage from "~/pages/LoadingPage/LoadingPage";
import { useGet } from "~/services/utils/fetch";
import { useTitle } from "~/customizes/hooks";
// ? Assets
import overviewImg from "~/assets/img/CategoryPage/overview_img.png";
import banner from "~/assets/img/CategoryPage/collecttions/banner.png";

import classNames from "classnames/bind";
import style from "./CategoryPage.module.scss";

const cx = classNames.bind(style);

const SensationalProducts = (props) => {
  const navigate = useNavigate();
  const directionLink = `/home/c/${props.categoryData.name}/${props.categoryData.id}/products`;
  const renderProductsDetail = () => {
    return props.categoryData.subCategory.map((productDetail, index) => {
      return (
        <div className="c-3 gutter" key={index}>
          <div className={cx("category-sensational-products-detail-wrapper")}>
            <a
              href="#"
              className={cx("category-sensational-products-detail-img-wrapper")}
            >
              <div
                className={cx(
                  "category-sensational-products-detail-img-square-shape"
                )}
              >
                <img
                  src={productDetail.imgSrc}
                  alt={productDetail.name}
                  className={cx("category-sensational-products-detail-img")}
                />
              </div>
            </a>
            <h4
              className={`${cx(
                "category-sensational-products-detail-name"
              )} h4-size-default`}
            >
              {productDetail.name}
            </h4>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={cx("category-sensational-products-wrapper")}>
      <div className={`${cx("category-sensational-product")} grid wide`}>
        <div className="row">
          <div className="c-12 gutter">
            <div
              className={`${cx("categroy-sesational-products-content")} mb-2`}
            >
              <h2 className="h2-size-default">{props.categoryData.name}</h2>
              <p className="paragraph-text-style">
                Our buyers literally search far and wide across the globe to
                find the best, high quality fashionable sofas that come{" "}
                <br></br> from some of biggest and brightest names in design and
                manufacturing. Sink into designs from Orla Kiely, Collins{" "}
                <br></br> Hayes, Stressless, Parker Knoll, Himolla, ercol and
                many more.
              </p>
              <h6 className="h6-size-default">
                YOU CAN ALSO SPREAD YOUR PAYMENTS WITH OUR INTEREST FREE CREDIT
                AVAILABLE <br></br> WHEN YOU SPEND OVER £1000
              </h6>
            </div>

            <div className="row mb-2">
              <div className="c-12 gutter">
                <div
                  className={`${cx(
                    "category-sensational-products-list"
                  )} grid wide`}
                >
                  <div className="row">{renderProductsDetail()}</div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="c-12 gutter flex-center">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    navigate(directionLink);
                  }}
                >
                  {`View All ${props.categoryData.name}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Collection = (props) => {
  return (
    <div className={cx("category-colection-wrapper")}>
      <div className={`${cx("category-collection")} grid wide`}>
        <div className="row">
          <div className="c-5 gutter">
            <div
              className={`${cx("category-collection-content-wrapper")} mb-3`}
            >
              <h3 className="h3-size-default">LET'S TRANSFORM YOUR SPACE</h3>
              <p className="paragraph-text-style-strong">
                At Lenleys Home we have a passion for high quality furniture
                that suits all<br></br> tastes and fashions.
              </p>
              <p className="paragraph-text-style">
                Our ranges are available in numerous coloured fabrics
                andpatterns, and we
                <br></br>
                stock a beautiful array of both manual and electric recliner
                sofas, love seats,
                <br></br>
                and chaise end combinations. Tempted to make a change?
              </p>
              <Tooltip
                placement="right"
                promptText="Feature is on develop state"
              >
                <Button type="primary" size="small">
                  See collection
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="c-7 gutter">
            <a
              href="#"
              className={cx("category-collection-banner-link-wrapper")}
            >
              <img
                src={banner}
                alt="Category Collection"
                className={cx("category-collection-banner-link-img")}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryPage = (props) => {
  const params = useParams();
  const { fetchResultData, isLoading } = useGet(`category/${params["id"]}`);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className={cx("category-wrapper")}>
      <div className={`${cx("category-overview-wrapper")}`}>
        <div className={`${cx("category-overview")} grid wide`}>
          <div className="row">
            <div className="c-6 gutter">
              <div className={cx("category-overview-content")}>
                <h1 className="h1-size-xl">{fetchResultData.data.name}</h1>
                <h3 className="h3-size-default">
                  {fetchResultData.data.title}
                </h3>
                <span className={cx("category-overview-strong-text")}>
                  <h2 className="h2-size-large">EXTRA 10% OFF SALE PRICES</h2>
                </span>
                <p className="paragraph-text-style mb-1">
                  {fetchResultData.data.description}
                </p>
              </div>
            </div>
            <div className="c-6 gutter">
              <a href="#" className={cx("category-img-wrapper")}>
                <img
                  src={overviewImg}
                  alt="category img"
                  className={cx("category-img")}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <SensationalProducts categoryData={fetchResultData.data} />
      <Collection />
      <Brands />
    </div>
  );
};

export default CategoryPage;

// todo: Fix data -> get from category database
