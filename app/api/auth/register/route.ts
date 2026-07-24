import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "@/lib/db/mongoose";
import User from "@/backend/models/User";
import jwt from "jsonwebtoken";
import { rateLimit } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const limiter = rateLimit(20, 2); // 20 requests capacity, refill 2 per min/sec? Let's check rate-limit.ts. It's tokens per second? "timePassed / 1000 * refillRate". Yes, 2 per second.

const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET or NEXTAUTH_SECRET environment variable is not defined");
  }
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export async function POST(req: NextRequest) {
  const rateLimitResult = limiter(req as any);
  if (!rateLimitResult.allowed) {
    return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });
  }

  try {
    await connectMongoose();
    const { name, email, password, role, phone, address } = await req.json();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const roleMap: any = {
      "Donate Medicines": "donor",
      "volunteer": "volunteer",
    };
    const normalizedRole = roleMap[role] || role;

    const user = await User.create({ name, email, password, role: normalizedRole, phone, address });

    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "User registered successfully",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid user data" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    logger.error("Register API Error Details:", JSON.stringify(error, null, 2));
    logger.error("Register API Error Message:", error.message);
    
    // Improve error message for pattern failures
    let errorMessage = error.message;
    if (errorMessage && errorMessage.includes("did not match the expected pattern")) {
      errorMessage = "Validation failed: Password must contain at least 1 uppercase letter, 1 number, and 1 special character. Name must not contain invalid characters, and Email must be correctly formatted.";
    }

    return NextResponse.json(
      { success: false, message: errorMessage, details: error },
      { status: 500 }
    );
  }
}
