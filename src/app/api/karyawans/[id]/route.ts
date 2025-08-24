// /app/api/karyawans/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET - Ambil karyawan berdasarkan ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const karyawan = await prisma.karyawan.findUnique({
      where: { id },
    });

    if (!karyawan) {
      return NextResponse.json({ error: "Karyawan not found" }, { status: 404 });
    }

    return NextResponse.json(karyawan);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch karyawan" }, { status: 500 });
  }
}

// PUT - Update karyawan berdasarkan ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const { name, jabatan, umur, gaji } = await req.json();

    const gajiInt = parseInt(gaji);
    const umurInt = parseInt(umur);

    const karyawan = await prisma.karyawan.update({
      where: { id },
      data: {
        name,
        jabatan,
        umur: umurInt,
        gaji: gajiInt,
      },
    });

    return NextResponse.json(karyawan);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update karyawan" }, { status: 500 });
  }
}

// DELETE - Hapus karyawan berdasarkan ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.karyawan.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Karyawan deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete karyawan" }, { status: 500 });
  }
}
