"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, MessageCircle } from "lucide-react";

export function ExampleComponents() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Radix UI + Tailwind Integration</h1>
        <p className="text-muted-foreground">
          Example components showcasing Radix UI primitives with Tailwind CSS
          styling
        </p>
      </div>

      {/* Button Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            Different button styles using class-variance-authority
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Dialog Example */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog Component</CardTitle>
          <CardDescription>
            Modal dialog using Radix UI Dialog primitive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Example Dialog</DialogTitle>
                <DialogDescription>
                  This is a modal dialog built with Radix UI primitives and
                  styled with Tailwind CSS. It includes focus management,
                  keyboard navigation, and accessibility features out of the
                  box.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-2 mt-4">
                <Button>Primary Action</Button>
                <Button variant="outline">Secondary Action</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Tabs Example */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs Component</CardTitle>
          <CardDescription>
            Tabbed interface using Radix UI Tabs primitive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="text-muted-foreground">
                This tab contains overview information. Tabs provide a way to
                organize content into different sections that users can navigate
                between.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Analytics</h3>
              <p className="text-muted-foreground">
                Analytics data would be displayed here. This demonstrates how
                different content can be shown in each tab panel.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">Total Views</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">567</div>
                    <p className="text-xs text-muted-foreground">
                      Unique Visitors
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4 space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-muted-foreground">
                Settings panel content goes here. Each tab maintains its own
                state and content independently.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Accessibility First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Radix UI primitives come with accessibility features built-in,
              including keyboard navigation, focus management, and screen reader
              support.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Fully Customizable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Style components exactly how you want with Tailwind CSS while
              keeping all the robust functionality of Radix UI primitives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
