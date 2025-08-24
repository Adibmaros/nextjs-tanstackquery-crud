import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const karyawans = await prisma.karyawan.findMany();
  return NextResponse.json(karyawans);
}

export async function POST(req: NextRequest) {
  const { name, jabatan, umur, gaji } = await req.json();

  const gajiInt = parseInt(gaji);
  const umurInt = parseInt(umur);

  const karyawan = await prisma.karyawan.create({
    data: {
      name,
      jabatan,
      umur: umurInt,
      gaji: gajiInt,
    },
  });
  return NextResponse.json(karyawan);
}
