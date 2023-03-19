const { Category } = require("../models");
const { SubCategory } = require("../models");

const { sequelize } = require("../models");

const handleFormatCategoryListInCludeSub = (categoryList, subCategoryList) => {
  return categoryList.map((category) => {
    const { id, name, title, imgSrc, description } = category;
    const subCategoryArr = [];

    subCategoryList.forEach((subCategory) => {
      const { id, name, imgSrc, categoryID } = subCategory;

      if (category.id === subCategory.categoryID) {
        subCategoryArr.push({
          name: subCategory.name,
          imgSrc: subCategory.imgSrc,
        });
      }
    });

    return {
      ...{ id, name, title, imgSrc, description },
      subCategory: subCategoryArr,
    };
  });
};

class CategoryController {
  static async getCategoryList(req, res) {
    try {
      const categoryList = await Category.findAll();
      const subCategoryList = await SubCategory.findAll();

      res
        .status(200)
        .send(
          handleFormatCategoryListInCludeSub(categoryList, subCategoryList)
        );
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async getCategoryByID(req, res) {
    try {
      const { id } = req.params;

      const categoryList = await Category.findAll();
      const subCategoryList = await SubCategory.findAll();

      handleFormatCategoryListInCludeSub(categoryList, subCategoryList);

      const foundCategory = handleFormatCategoryListInCludeSub(
        categoryList,
        subCategoryList
      )[id - 1];

      if (foundCategory) {
        // ? is exist
        res.status(200).send(foundCategory);
      } else {
        // ? doesnt exist yet
        res
          .status(404)
          .send("category doesn't already exists pls check it and try again!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async createCategory(req, res) {
    try {
      const { fieldname, filename } = req.file;
      const { name } = req.headers;
      const oldCategory = await Category.findOne({
        where: {
          name,
        },
      });
      if (oldCategory) {
        res.status(404).send("Category is already exists!");
      } else {
        const categoryImgSrc = `http://localhost:8080/img/${fieldname}/${filename}`;
        const newCategory = { name, imgSrc: categoryImgSrc };
        await Category.create(newCategory);
        res
          .status(201)
          .send(`Create category success - ${JSON.stringify(newCategory)}`);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async getSubCategoryList(req, res) {
    try {
      const SubCategoryList = await SubCategory.findAll();
      res.status(200).send(SubCategoryList);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async getSubCategoryByID(req, res) {
    try {
      const { id } = req.params;
      const foundSubCategory = await SubCategory.findOne({
        where: {
          id,
        },
      });

      if (foundSubCategory) {
        // ? is exist
        res.status(200).send(foundSubCategory);
      } else {
        // ? doesnt exist yet
        res
          .status(404)
          .send("category doesn't already exists pls check it and try again!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
module.exports = CategoryController;
