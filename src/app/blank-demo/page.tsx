import { PageLayout } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function BlankDemoPage() {
  return (
    <PageLayout
      template="blank"
      className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Blank Template Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              This page uses the <strong>BlankTemplate</strong> layout. It
              provides a completely clean slate with no header, footer, or
              sidebar - perfect for landing pages, authentication forms, or
              custom full-screen experiences.
            </p>

            <div className="grid gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full-screen layout with no constraints</li>
                  <li>• Perfect for custom designs</li>
                  <li>• Minimal overhead</li>
                  <li>• Complete creative freedom</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Use Cases:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Landing pages</li>
                  <li>• Authentication screens</li>
                  <li>• Custom dashboards</li>
                  <li>• Portfolio showcases</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/contained-demo">
                <Button variant="outline">View Contained Layout</Button>
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
