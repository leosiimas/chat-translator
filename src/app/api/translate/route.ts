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

  const res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      q: text,
      target,
      source,
      format: "text",
    }
  );

  const traduction = res?.data.data.translations[0];
  return NextResponse.json({ traduction });
}
