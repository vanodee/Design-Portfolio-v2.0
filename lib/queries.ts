import { groq } from "next-sanity";

export const categoriesQuery = groq`
  *[_type == "category"]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
  }
`;


export const categoriesWithToolsQuery = groq`
 *[_type == "category"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url,

  "tools": *[_type == "project" && references(^._id)].tools[]->{
    _id,
    title,
    "iconUrl": icon.asset->url,
    color
  }
}
`;