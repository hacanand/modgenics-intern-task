"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CaptchaSolver() {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [coins, setCoins] = useState(0);
  const [message, setMessage] = useState("");
//set coins in the local storage
  useEffect(() => {
    const coins = localStorage.getItem("coins");
    if (coins) {
      setCoins(parseInt(coins));
    }
    fetchNewCaptcha();
  }, []);

  const fetchNewCaptcha = async () => {
    try {
      const response = await fetch("/api/captcha");
      const data = await response.json();
      setCaptcha(data.captcha);
    } catch (error) {
      console.error("Error fetching CAPTCHA:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captcha, userInput }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("coins", data.coins);
        setCoins(data.coins);
        setMessage("Correct! You earned a coin.");
      } else {
        setMessage("Incorrect. Try again.");
      }
      setUserInput("");
      fetchNewCaptcha();
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>CAPTCHA Solver</CardTitle>
          <CardDescription>Solve CAPTCHAs to earn coins!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-2xl font-bold text-center bg-gray-200 p-4 rounded  ">
              {captcha}
            </div>
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter CAPTCHA"
              required
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
         
          <p
            className={`${
              message == "Correct! You earned a coin."? "text-green-500" : "text-red-500"
            }  text-sm  text-center`}
          >
            {message}
          </p>
          <p className="text-lg font-semibold">Coins: {coins}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
