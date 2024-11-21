import { NextResponse } from "next/server";

export async function GET() {
  // Generate a random 6-character upper case and lower case special letter( !@#$%^&*) and  number only CAPTCHA
  const captcha = Array.from({ length: 8 }, () => {
    const type = Math.floor(Math.random() * 4);
    switch (type) {
      case 0:
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      case 1:
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      case 2:
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
      case 3:
        return "!@#$%^&*"[Math.floor(Math.random() * 8)];
    }
  }).join("");

  return NextResponse.json({ captcha });
}
