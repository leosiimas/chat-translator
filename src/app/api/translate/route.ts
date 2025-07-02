import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { error } from "console";

export async function POST(req: NextRequest) {
  console.log("here");
  const { text, target, source } = await req.json();
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  console.log({
    q: text,
    target,
    format: "text",
  });

  const res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      q: text,
      target,
      format: "text",
    }
  );

  const traduction = res?.data.data.translations[0];
  return NextResponse.json({ traduction });
}
