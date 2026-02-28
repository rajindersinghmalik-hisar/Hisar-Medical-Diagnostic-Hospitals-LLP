// src/app/api/admin/image/route.js

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// ===============================
// POST - Upload Image
// ===============================
export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("image");

    if (!file || !title || !description) {
      return NextResponse.json(
        { success: false, message: "Image, title, description required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "admin_images",
          resource_type: "image",
          context: `title=${title}|description=${description}`,
        },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(buffer);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: {
          publicId: uploadResult.public_id,
          imageUrl: uploadResult.secure_url,
          title,
          description,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Error uploading image", error: error.message },
      { status: 500 }
    );
  }
}

// ===============================
// GET - Fetch All Images
// ===============================
export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:admin_images")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const images = result.resources.map((item) => ({
      publicId: item.public_id,
      imageUrl: item.secure_url,
      title: item.context?.custom?.title || "",
      description: item.context?.custom?.description || "",
      createdAt: item.created_at,
    }));

    return NextResponse.json(
      { success: true, images },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching images" },
      { status: 500 }
    );
  }
}

// ===============================
// DELETE - Delete Images
// ===============================
export async function DELETE(req) {
  try {
    const body = await req.json();
    const { publicIds } = body; // expects { publicIds: ["id1", "id2"] }

    if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "No image IDs provided" },
        { status: 400 }
      );
    }

    await cloudinary.api.delete_resources(publicIds);

    return NextResponse.json(
      {
        success: true,
        message: `${publicIds.length} image(s) deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}