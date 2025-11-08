import { groq } from "next-sanity";

export const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    "iconUrl": icon.asset->url
  }
`;