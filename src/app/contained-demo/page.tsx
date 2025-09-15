"use client";

import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Sidebar } from "@/components/common/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContainedDemoPage() {
  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      sidebar={<Sidebar />}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Contained Layout Template Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              This page demonstrates the{" "}
              <strong>ContainedLayoutTemplate</strong> with all features
              enabled: header navigation, sidebar content, main content area,
              and footer.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Layout Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Header Navigation</span>
                    <span className="text-green-600">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Sidebar Content</span>
                    <span className="text-green-600">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Footer Links</span>
                    <span className="text-green-600">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Responsive Design</span>
                    <span className="text-green-600">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Container Max Width</span>
                    <span className="text-blue-600">2xl</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Template Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Max Width:</strong> sm, md, lg, xl, 2xl, full
                    </div>
                    <div>
                      <strong>Header:</strong> Optional custom header component
                    </div>
                    <div>
                      <strong>Footer:</strong> Optional custom footer component
                    </div>
                    <div>
                      <strong>Sidebar:</strong> Optional sidebar (hidden on
                      mobile)
                    </div>
                    <div>
                      <strong>Responsive:</strong> Mobile-first responsive
                      design
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Area</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  This is the main content area. It automatically adjusts its
                  width based on whether a sidebar is present and responds to
                  different screen sizes. The container maintains proper spacing
                  and typography scale.
                </p>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Layout Behavior:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sidebar is hidden on mobile (&lt; lg breakpoint)</li>
                    <li>
                      • Header navigation collapses to hamburger menu on mobile
                    </li>
                    <li>• Container width is constrained by maxWidth prop</li>
                    <li>
                      • Backdrop blur effect on header for modern appearance
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/blank-demo">
                <Button variant="outline">View Blank Layout</Button>
              </Link>
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
