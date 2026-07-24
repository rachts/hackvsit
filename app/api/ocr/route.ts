import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const limiter = rateLimit(10, 1);
export async function POST(req: NextRequest) {
  const rateLimitResult = limiter(req as any);
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const OCR_URL = process.env.OCR_API_URL || "http://127.0.0.1:8000";
    
    // Forward the file directly to the Python OCR service
    const response = await fetch(`${OCR_URL}/api/ocr-check`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("FastAPI OCR Error:", errorText);
      return NextResponse.json({ error: "OCR processing failed on backend" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    logger.error("OCR Proxy Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
