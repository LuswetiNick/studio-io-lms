import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BanknoteX } from "lucide-react";
import Link from "next/link";

const CancelledPayment = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="w-full flex justify-center">
          <BanknoteX className="size-12 p-2 bg-destructive/10 text-destructive/80 rounded-full" />
        </div>
        <CardContent className="text-center space-y-4">
          <h2>Payment Cancelled</h2>
          <p className="text-xs text-muted-foreground tracking-tight text-balance">
            Don't panic. You will not be charged. Please try again
          </p>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default CancelledPayment;
