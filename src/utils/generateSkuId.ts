const generateSkuId = (category: string, item: string, variant: string) => {
  const unique = Math.random().toString(36).substring(2, 4).toUpperCase();

  return [
    "GR",
    category.slice(0, 3).toUpperCase(),
    item.slice(0, 3).toUpperCase(),
    variant.toUpperCase(),
    unique,
  ].join("-");
};

export default generateSkuId;
