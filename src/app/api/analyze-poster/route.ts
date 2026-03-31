import { NextRequest, NextResponse } from "next/server";

async function extractItineraryFromText(apiKey: string, rawTextBlocks: string[]) {
  const text = rawTextBlocks.filter(Boolean).join("\n");
  if (!text.trim()) return [];

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'Extract ONLY the itinerary/schedule from the text. Return JSON: {"itineraryItems":[{ "time": string|null, "title": string|null, "description": string|null, "speakerName": string|null, "location": string|null, "durationMinutes": number|null }]} . If you cannot find any schedule, return {"itineraryItems": []}.',
        },
        { role: "user", content: text },
      ],
      max_tokens: 700,
      temperature: 0.1,
    }),
  });

  if (!resp.ok) return [];
  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content || "{}";
  const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed?.itineraryItems) ? parsed.itineraryItems : [];
  } catch {
    return [];
  }
}

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
        itineraryItems: [
          {
            time: "09:00 AM",
            title: "Opening Keynote",
            description: "Welcome address and theme-setting remarks.",
            speakerName: "Dr. Aris",
            location: "Main Stage",
            durationMinutes: 60,
          },
        ],
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
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              'You are an event poster/invite analyser.\n\nReturn ONLY JSON (no markdown) with keys:\n- eventName, date, time, location, dressCode, hostName, rsvpDeadline, additionalNotes\n- rawTextBlocks: array of strings (include *all* readable text lines, including schedule lines)\n- itineraryItems: array of schedule items extracted from the poster (even if the poster uses terms like Agenda / Program / Sessions / Speakers). Each item: time, title, description, speakerName, location, durationMinutes.\n\nRules:\n- If the poster contains a schedule, itineraryItems MUST be non-empty.\n- Use null for unknown fields.\n- If truly no schedule is present, return itineraryItems as [].',
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
    if (!parsed.itineraryItems) parsed.itineraryItems = [];

    // If the vision pass missed itinerary but text includes schedule-like lines,
    // do a second pass from rawTextBlocks to extract itinerary items.
    if (Array.isArray(parsed.rawTextBlocks) && (!Array.isArray(parsed.itineraryItems) || parsed.itineraryItems.length === 0)) {
      const inferred = await extractItineraryFromText(apiKey, parsed.rawTextBlocks);
      if (Array.isArray(inferred) && inferred.length > 0) {
        parsed.itineraryItems = inferred;
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyse poster" }, { status: 500 });
  }
}
