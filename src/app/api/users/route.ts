// src/app/api/users/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

// GET - Read all users
export async function GET(): Promise<NextResponse<User[] | { error: string }>> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc", // Order by latest first
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST - Create new user
export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    const { name, email, age } = await request.json();

    // Convert age to number and add validation
    const ageNumber = parseInt(age, 10);

    if (isNaN(ageNumber) || ageNumber <= 0) {
      return NextResponse.json({ error: "Age must be a valid positive number" }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age: ageNumber,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
