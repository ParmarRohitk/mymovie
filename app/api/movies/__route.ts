import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const filePath = path.join(process.cwd(), 'app/data/text.json');
    const fileData = await fs.promises.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileData || '[]');

    // Append new text to the existing array
    jsonData.push({ text });

    // Write back to the JSON file
    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

    return NextResponse.json({ message: 'Text saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to save text:', error);
    return NextResponse.json({ message: 'Failed to save text. Please try again.' }, { status: 500 });
  }
}
