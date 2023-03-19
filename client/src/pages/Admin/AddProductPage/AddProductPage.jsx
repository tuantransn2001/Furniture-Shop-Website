import React, { useRef, useState, useEffect } from "react";
import ProductDetail from "./ProductDetail/ProductDetail";
import ProductList from "./ProductList/ProductList";
import FormGroup from "~/components/helpers/FormGroup/FormGroup";
import Modal from "~/components/helpers/Modal/Modal";
import SingleImageUploadModal from "~/components/SingleImageUploadModal/SingleImageUploadModal";
import Button from "~/components/helpers/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

import { fetchApi } from "~/services/utils/fetch";
import { validateObjectWithKeyList } from "~/common/common";
import { addProductFormData } from "./AddProductData";
import classNames from "classnames/bind";
import style from "./AddProductPage.module.scss";
const cx = classNames.bind(style);

const AddProductFormModal = ({ isModalOn, setIsModalOn }) => {
  const closeModalBtnRef = useRef(null);
  const [productInfo, getProductInfo] = useState({});

  // ? Handle close modal
  useEffect(() => {
    const closeModalBtnEl = closeModalBtnRef.current;
    const handleClose = (e) => {
      setIsModalOn(false);
    };
    closeModalBtnEl && closeModalBtnEl.addEventListener("click", handleClose);
    return () =>
      closeModalBtnEl &&
      closeModalBtnEl.removeEventListener("click", handleClose);
  }, []);
  // ? Handle fetch data
  useEffect(() => {
    const isConfirmProductInfo = validateObjectWithKeyList(
      [
        "name",
        "price",
        "category",
        "subCategory",
        "file",
        "fileName",
        "description",
      ],
      productInfo
    );

    const handleMakeRequest = async () => {
      const { name, price, description, category, subCategory, file } =
        productInfo;
      const formData = new FormData();
      // ? Create headers
      const headers = {
        name,
        description,
        price,
        category,
        subCategory,
      };
      // ? Create FormData
      formData.append("product", file);
      const fetchResult = await fetchApi.post("product/upload/img", formData, {
        headers,
      });
      try {
        console.log(fetchResult);
      } catch (err) {
        console.log(err);
      }
    };

    if (isConfirmProductInfo) {
      // ? Fetch data
      handleMakeRequest();
      setIsModalOn(false);
      window.location.reload();
    } else {
      // ! Warn
      console.log("Do not confirm");
    }
  }, [productInfo]);
  return (
    <Modal isOn={isModalOn}>
      <div className={cx("add-product-form-modal-wrapper")}>
        <header>
          <h2 className={cx("form-title")}>Add New Product</h2>
          <Button size={null} type={null} ref={closeModalBtnRef}>
            <span className={cx("close-modal-btn-icon-wrapper")}>
              <FontAwesomeIcon
                icon={faXmark}
                className={cx("close-modal-btn-icon")}
              />
            </span>
          </Button>
        </header>

        <section className="grid">
          <div className="row">
            <div className="c-12 gutter">
              {/* <SingleImageUploadModal getImageInfo={getProductInfo} /> */}
            </div>
          </div>
          <div className="row">
            <div className="c-12 gutter">
              <FormGroup
                formFieldsData={addProductFormData}
                getUserDataGetterObj={getProductInfo}
              />
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

const AddProductPage = (props) => {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <>
      <AddProductFormModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
      <div className={cx("add-product-page-wrapper")}>
        <header className={cx("add-product-page-header")}>
          <h3 className="page-content-title">Products list</h3>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setIsModalOn(true);
            }}
            icon={faPlus}
          >
            Add Product
          </Button>
        </header>
        <section className={cx("add-product-page-body")}>
          <div className="grid">
            <div className="row">
              <div className="c-8 gutter">
                <ProductList />
              </div>
              <div className="c-4 gutter">
                <ProductDetail />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddProductPage;
