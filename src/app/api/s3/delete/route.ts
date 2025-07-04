import requireAdmin from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { s3 } from "@/lib/s3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  const decision = await aj.protect(request, {
    fingerprint: session?.user.id as string,
  });
  if (decision.isDenied()) {
    return NextResponse.json({ error: "Denied!" }, { status: 429 });
  }
  try {
    const body = await request.json();
    const { key } = body;
    if (!key) {
      return NextResponse.json(
        { error: "Missing or Invalid key" },
        { status: 400 }
      );
    }
    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });
    await s3.send(command);
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
