import { NextResponse } from "next/server";

export async function POST() {
  // TODO: persist DSR request to a durable store / ticketing system.
  return NextResponse.json(
    {
      status: "received",
      message:
        "Your Do Not Sell/Share preference has been recorded. We will respond within the required regulatory window.",
    },
    { status: 202 },
  );
}
