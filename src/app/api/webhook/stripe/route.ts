import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const stripeSignature = headerList.get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const customerId = session.customer as string;
    if (!courseId) {
      throw new Error("Course ID not found");
    }
    if (!customerId) {
      throw new Error("Customer ID not found");
    }
    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.enrollment.update({
      where: {
        id: session.metadata?.enrollmentId as string,
      },
      data: {
        userId: user.id,
        courseId: courseId,
        amount: session.amount_total as number,
        status: "Completed",
      },
    });
  }
  return new Response("Webhook received", { status: 200 });
}
