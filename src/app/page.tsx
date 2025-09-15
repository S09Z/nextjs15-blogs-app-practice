"use client";

import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Layout, Palette, Layers } from "lucide-react";

export default function Home() {
  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="2xl"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multiple Layout Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience different layout templates for your Next.js blog. Choose
            between minimal blank layouts or feature-rich contained layouts with
            headers, footers, and sidebars.
          </p>
        </div>

        {/* Layout Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5 text-blue-500" />
                Blank Template
              </CardTitle>
              <CardDescription>
                Clean slate for complete creative freedom
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full-screen layout</li>
                  <li>• No header/footer constraints</li>
                  <li>• Perfect for landing pages</li>
                  <li>• Custom design freedom</li>
                </ul>
              </div>

              <Link href="/blank-demo">
                <Button className="w-full group-hover:bg-blue-600 transition-colors">
                  View Blank Template
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-500" />
                Contained Template
              </CardTitle>
              <CardDescription>
                Structured layout with navigation and content areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Header navigation</li>
                  <li>• Optional sidebar</li>
                  <li>• Footer content</li>
                  <li>• Responsive design</li>
                </ul>
              </div>

              <Link href="/contained-demo">
                <Button className="w-full group-hover:bg-purple-600 transition-colors">
                  View Contained Template
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-500" />
                Floating UI
              </CardTitle>
              <CardDescription>
                Advanced tooltips, popovers, and dropdowns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Smart positioning</li>
                  <li>• Collision detection</li>
                  <li>• Keyboard navigation</li>
                  <li>• Rich interactions</li>
                </ul>
              </div>

              <Link href="/floating-ui-demo">
                <Button className="w-full group-hover:bg-indigo-600 transition-colors">
                  View Floating UI Demo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-500" />
                Landing Page
              </CardTitle>
              <CardDescription>
                Animated landing page with floating elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Floating animations</li>
                  <li>• Interactive tooltips</li>
                  <li>• Smooth transitions</li>
                  <li>• Modern design</li>
                </ul>
              </div>

              <Link href="/landing">
                <Button className="w-full group-hover:bg-emerald-600 transition-colors">
                  View Landing Demo
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Example */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-green-500" />
              How to Use
            </CardTitle>
            <CardDescription>
              Simple implementation for any page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Blank Template Usage:</h4>
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {`<PageLayout template="blank">
  <YourCustomContent />
</PageLayout>`}
              </pre>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Contained Template Usage:</h4>
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {`<PageLayout
  template="contained"
  header={<Header />}
  footer={<Footer />}
  sidebar={<Sidebar />}
  maxWidth="2xl"
>
  <YourPageContent />
</PageLayout>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Built With</CardTitle>
            <CardDescription>
              Modern technologies for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Next.js 15</div>
                <div className="text-xs text-muted-foreground">
                  React Framework
                </div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Radix UI</div>
                <div className="text-xs text-muted-foreground">Components</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">Tailwind CSS</div>
                <div className="text-xs text-muted-foreground">Styling</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-semibold">TypeScript</div>
                <div className="text-xs text-muted-foreground">Type Safety</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
