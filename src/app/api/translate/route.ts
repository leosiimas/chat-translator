import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { text, target, source } = await req.json();
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  console.log("here");
  console.log(apiKey);
  console.log({
    q: text,
    source,
    target,
    format: "text",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let traduction: any;

  try {
    const res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        q: text,
        target,
        source,
        format: "text",
      },
    );

    traduction = res?.data.data.translations[0];
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ traduction });
}
