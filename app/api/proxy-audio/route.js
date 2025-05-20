import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get('url');

  if (!audioUrl) {
    return new NextResponse('Missing URL parameter', { status: 400 });
  }

  try {
    const audioRes = await fetch(audioUrl);

    if (!audioRes.ok) {
      return new NextResponse('Failed to fetch audio', { status: 502 });
    }

    const contentType = audioRes.headers.get('content-type') || 'audio/mpeg';
    const arrayBuffer = await audioRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.length.toString(),
        'Accept-Ranges': 'bytes', // ✅ Critical for seeking!
      },
    });
  } catch (err) {
    return new NextResponse('Server Error', { status: 500 });
  }
}
