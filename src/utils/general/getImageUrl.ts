// src/utils/getImageUrl.ts
export const getImageUrl = (productId: string) => {
  return `https://oucyhzrjoganvzncipjh.supabase.co/storage/v1/object/public/product/${productId}.jpg`;
};
