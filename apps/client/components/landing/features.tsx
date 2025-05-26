// /landing/features.tsx
import {
  FileText,
  Users,
  History,
  Shield,
  Zap,
  Globe,
  PenTool,
  Eye
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Rich Text Editing",
      description:
        "Format your documents with a comprehensive set of styling and formatting options."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Real-Time Collaboration",
      description:
        "Work with teammates simultaneously without conflicts or delays."
    },
    {
      icon: <PenTool className="h-8 w-8 text-primary" />,
      title: "Live Cursors",
      description:
        "See where others are typing and editing in real time with colored cursors."
    },
    {
      icon: <History className="h-8 w-8 text-primary" />,
      title: "Version History",
      description:
        "Track all changes and revert to previous versions at any time."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Sharing",
      description:
        "Control who can view or edit your documents with fine-grained permissions."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast & Responsive",
      description:
        "Optimized for speed and reliability, even with multiple users."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Work Anywhere",
      description:
        "Access your documents from any device with an internet connection."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Presence Awareness",
      description:
        "See who's viewing your document in real time with user presence indicators."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need for Seamless Collaboration
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed">
              Our platform combines powerful editing features with real-time collaboration tools to enhance your team&apos;s productivity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}