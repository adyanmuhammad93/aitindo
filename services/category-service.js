/* eslint-disable */
import axios from "axios";
import _ from "lodash";

export const getCategories = async categoryId => {
  const categoryKey = "__categoryWellings";

  // if (localStorage.getItem(categoryKey)) {
  if (
    localStorage.getItem(categoryKey) &&
    localStorage.getItem(categoryKey) !== "{}"
  ) {
    return JSON.parse(localStorage.getItem(categoryKey));
  }

  // const url2 = `${process.env.HOST_API}/api/v1/categories/`;
  const url2 = `https://api-dev.eraspace.com/jds-products/api/v1/categories/`;
  categoryId = 9;
  let category;
  try {
    const result = await axios.get(url2);

    category = _.find(result.data?.data.children_data, {
      id: parseInt(categoryId, 10)
    }).children_data;

    localStorage.setItem(categoryKey, JSON.stringify(category));

    return category;
  } catch (error) {
    throw Error(error);
  }
};

function findCategoryById(categoryId, categories) {
  const recusivelyFindCategoryById = (categoryId, categoryTree) => {
    if (categoryId === categoryTree.id) {
      return categoryTree;
    } else {
      for (const category of categoryTree.children_data) {
        return recusivelyFindCategoryById(categoryId, category);
      }
    }
  };

  if (Array.isArray(categories)) {
    for (const category of categories) {
      const categoryFound = recusivelyFindCategoryById(categoryId, category);
      if (categoryFound) {
        return categoryFound;
      }
    }
  }
}

function findCategoryParentTreeById(categoryId, categories) {
  const recusivelyFindCategoryTreeById = (
    categoryId,
    categoryTree,
    currentTree = []
  ) => {
    if (categoryId === categoryTree.id) {
      return currentTree;
    } else {
      for (const category of categoryTree.children_data) {
        return recusivelyFindCategoryTreeById(
          categoryId,
          category,
          currentTree.concat(category)
        );
      }
    }
  };

  if (Array.isArray(categories)) {
    for (const category of categories) {
      const categoryFound = recusivelyFindCategoryTreeById(
        categoryId,
        category,
        [category]
      );
      if (categoryFound) {
        return categoryFound;
      }
    }
  }
}

export const getCategoryParentTreeById = async categoryId => {
  const categories = await getCategories();

  return findCategoryParentTreeById(categoryId, categories);
};

export const getCategoryById = async categoryId => {
  const categories = await getCategories();

  return findCategoryById(categoryId, categories);
};
