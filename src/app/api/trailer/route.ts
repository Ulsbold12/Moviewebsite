// app/api/trailer/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Жишээ trailer ID
  const youtubeId = "xU6LYReBjQM";

  return NextResponse.json({ youtubeId });
}
