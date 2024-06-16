"use server";

import prisma from "./db";
import dayjs from "dayjs";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) redirect("/");
  return userId;
}

export async function createJobAction(values: CreateAndEditJobType): Promise<JobType | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedirect();

  try {
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}
