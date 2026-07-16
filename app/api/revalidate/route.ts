import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    req,
    process.env.SANITY_REVALIDATE_SECRET
  );

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
  }

  // { expire: 0 } forces an immediate full purge of this tag (Next 16 made revalidateTag's second
  // "cache profile" argument mandatory; named profiles like 'max' depend on cacheLifeProfiles
  // config we don't define, so pass the expiry directly instead).
  revalidateTag(body._type, { expire: 0 });
  return NextResponse.json({ revalidated: true, tag: body._type, now: Date.now() });
}
