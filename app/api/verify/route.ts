import { NextResponse } from 'next/server'

let userCoins = 0

export async function POST(req: Request) {
  const { captcha, userInput } = await req.json()

  if (captcha === userInput ) {
    userCoins++
    return NextResponse.json({ success: true, coins: userCoins })
  } else {
    return NextResponse.json({ success: false, coins: userCoins })
  }
}

