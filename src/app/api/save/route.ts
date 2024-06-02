import prisma from "@/app/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return NextResponse.json("User not present");
  }

  try {
    const { storyId } = await request.json();
    const storyExist = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    if (!storyExist) {
      throw new Error("Story does not exist");
    }

    const savedCheck = await prisma.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (savedCheck) {
      await prisma.save.delete({
        where: {
          id: savedCheck.id,
        },
      });
      return NextResponse.json({ message: "Story removed from saved stories" });
    } else {
      const SaveStory = await prisma.save.create({
        data: {
          userId,
          storyId: storyExist.id,
        },
      });
      return NextResponse.json(SaveStory);
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}
