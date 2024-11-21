import { NextResponse } from 'next/server'

export async function GET() {
  // Generate a random 6-character CAPTCHA
  const captcha = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  return NextResponse.json({ captcha })
}

