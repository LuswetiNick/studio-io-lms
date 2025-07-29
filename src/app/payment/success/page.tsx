import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BanknoteX, Check } from "lucide-react";
import Link from "next/link";

const SuccessPayment = () => {
  return (
    <div className="w-full min-h-screen flex flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="w-full flex justify-center">
          <Check className="size-12 p-2 bg-primary/10 text-primary/80 rounded-full" />
        </div>
        <CardContent className="text-center space-y-4">
          <h2>Payment Successful!</h2>
          <p className="text-xs text-muted-foreground tracking-tight text-balance">
            Congratulations! You now have access to the course.
          </p>
          <Button className="w-full" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              Proceed to Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default SuccessPayment;
