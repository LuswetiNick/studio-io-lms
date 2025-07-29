import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full py-16  ">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 py-1">
              🚀 New Online Learning Platform Launch
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Master New Skills with
              <span className="text-primary block sm:inline"> Studio IO</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discvoer a new way to learn with our modern, interactive online
              learning platform. Access high-quality courses and learn at your
              own pace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link className={buttonVariants({ size: "lg" })} href="/sign-up">
                <PlayCircle className=" h-5 w-5" />
                Start Learning Today
              </Link>
              <Link
                className={buttonVariants({ size: "lg", variant: "outline" })}
                href="/courses"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
