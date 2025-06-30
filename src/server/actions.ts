"use server";

import requireAdmin from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth, ErrorCode } from "@/lib/auth";
import { ApiResponse } from "@/lib/types";
import {
  courseSchema,
  CourseSchemaType,
  loginSchema,
  signUpSchema,
} from "@/lib/zod-schemas";
import { prisma } from "@/prisma/prisma";
import { request } from "@arcjet/next";
import { APIError } from "better-auth/api";
import { NextResponse } from "next/server";
import { z } from "zod";

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

// SignUp
export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.message,
    };
  }
  try {
    await auth.api.signUpEmail({
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });
    return {
      status: "success",
      message: "Registration successful. You are all set!",
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS":
          return {
            status: "error",
            message: "User already exists",
          };
        case "INVALID_PASSWORD":
          return {
            status: "error",
            message: "Invalid password",
          };
        default:
          return {
            status: "error",
            message: err.message || "Registration failed",
          };
      }
    }
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};

// Login
export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.message,
    };
  }
  try {
    await auth.api.signInEmail({
      body: {
        email: values.email,
        password: values.password,
      },
    });
    return {
      status: "success",
      message: "Welcome back!",
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errorCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "INVALID_EMAIL_OR_PASSWORD":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return {
            status: "error",
            message: err.message || "Login failed",
          };
      }
    }
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
};

// Create Course
export const createCourse = async (
  values: CourseSchemaType
): Promise<ApiResponse> => {
  const session = await requireAdmin();
  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id as string,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Blocked! Rate limit exceeded",
        };
      } else {
        return {
          status: "error",
          message: "You seem like a malicious user. Please contact support.",
        };
      }
    }
    const validation = courseSchema.safeParse(values);
    if (!validation.success) {
      return {
        status: "error",
        message: validation.error.message,
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
};
