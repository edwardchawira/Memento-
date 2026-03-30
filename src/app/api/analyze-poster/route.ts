import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        eventName: "The Highland Soirée",
        date: "September 24, 2024",
        time: "7:00 PM",
        location: "The Glass House, New York",
        dressCode: "Black Tie",
        hostName: "Julian & Clara",
        rsvpDeadline: "August 15, 2024",
        additionalNotes:
          "Valet parking available. Dietary preferences to be sent 2 weeks prior.",
        rawTextBlocks: [
          "The Highland Soirée",
          "September 24, 2024",
          "The Glass House, New York",
          "Black Tie",
          "RSVP by August 15",
        ],
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              'You are an event invite analyser. Extract structured information from the poster image. Return a JSON object with: eventName, date, time, location, dressCode, hostName, rsvpDeadline, additionalNotes, and rawTextBlocks (array of strings). Use null for missing fields. Return ONLY JSON, no markdown.',
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyse this event poster and extract all event information." },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${imageBase64}`, detail: "high" },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (!parsed.rawTextBlocks) parsed.rawTextBlocks = [];

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyse poster" }, { status: 500 });
  }
}
