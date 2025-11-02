/**
 * Global Privacy Control (GPC) API Endpoint
 * Honors user privacy signals per GPC specification
 * https://globalprivacycontrol.org/
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface GPCPreference {
  gpc: boolean;
  timestamp: string;
  source: "header" | "manual";
  scope: string[];
}

export async function GET(request: NextRequest) {
  const gpcHeader = request.headers.get("sec-gpc");
  const hasGPC = gpcHeader === "1";

  return NextResponse.json({
    gpc: hasGPC,
    honored: true,
    message: hasGPC
      ? "Your Global Privacy Control signal has been received and honored"
      : "No Global Privacy Control signal detected",
    effectiveDate: new Date().toISOString(),
    scope: [
      "analytics",
      "marketing",
      "advertising",
      "personalization",
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { optOut } = body;

    // Log the GPC preference (in production, persist to database)
    const preference: GPCPreference = {
      gpc: optOut === true,
      timestamp: new Date().toISOString(),
      source: "manual",
      scope: ["analytics", "marketing", "advertising", "personalization"],
    };

    // Set cookie to remember preference
    const response = NextResponse.json({
      success: true,
      preference,
      message: "Privacy preference saved successfully",
    });

    response.cookies.set("gpc-preference", JSON.stringify(preference), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  } catch (err) {
    console.error("GPC POST error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
