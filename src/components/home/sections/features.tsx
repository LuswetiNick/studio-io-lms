import { Book, Clock, Shield, TrendingUp } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const features = [
  {
    icon: Book,
    title: "Comprehensive Courses",
    description:
      "Access a wide range of courses covering various topics and skill levels.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and progress reports to stay motivated.",
  },

  {
    icon: Clock,
    title: "Learn at Your Pace",
    description:
      "Access courses 24/7 and learn at your own schedule with lifetime access to course materials.",
  },

  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "All courses are carefully curated and regularly updated to ensure high-quality learning experience.",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full py-16 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Learn
          </h2>
          <p className="max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Our platform provides all the tools and resources you need for
            effective online learning
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-md">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Features;
