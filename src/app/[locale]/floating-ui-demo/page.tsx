"use client";

import { PageLayout } from "@/components/layouts";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, Popover, Dropdown } from "@/components/floating-ui";
import {
  Info,
  Settings,
  User,
  LogOut,
  Edit,
  Trash,
  Download,
  Star,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { ExampleComponents } from "@/components/example-components";

export default function FloatingUIDemo() {
  const dropdownItems = [
    { label: "Profile", value: "profile", icon: <User className="h-4 w-4" /> },
    {
      label: "Settings",
      value: "settings",
      icon: <Settings className="h-4 w-4" />,
    },
    { label: "Edit", value: "edit", icon: <Edit className="h-4 w-4" /> },
    {
      label: "Download",
      value: "download",
      icon: <Download className="h-4 w-4" />,
    },
    {
      label: "Delete",
      value: "delete",
      icon: <Trash className="h-4 w-4" />,
      disabled: true,
    },
    { label: "Logout", value: "logout", icon: <LogOut className="h-4 w-4" /> },
  ];

  return (
    <PageLayout
      template="contained"
      header={<Header />}
      footer={<Footer />}
      maxWidth="2xl"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Floating UI Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tooltips, popovers, and dropdowns using Floating UI with
            Next.js
          </p>
        </div>

        {/* Tooltip Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Tooltip Components
            </CardTitle>
            <CardDescription>
              Hover over elements to see intelligent tooltips with
              auto-positioning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Tooltip content="This tooltip appears on top" placement="top">
                <Button variant="outline" className="w-full">
                  Top Tooltip
                </Button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the right side"
                placement="right"
              >
                <Button variant="outline" className="w-full">
                  Right Tooltip
                </Button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the bottom"
                placement="bottom"
              >
                <Button variant="outline" className="w-full">
                  Bottom Tooltip
                </Button>
              </Tooltip>

              <Tooltip
                content="This tooltip appears on the left side"
                placement="left"
              >
                <Button variant="outline" className="w-full">
                  Left Tooltip
                </Button>
              </Tooltip>
            </div>

            <div className="flex justify-center">
              <Tooltip
                content={
                  <div className="space-y-2">
                    <div className="font-semibold">Rich Content Tooltip</div>
                    <div className="text-sm">
                      This tooltip contains multiple elements and rich
                      formatting.
                    </div>
                    <div className="flex gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <Star className="h-4 w-4 text-yellow-500" />
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                }
                className="max-w-xs"
              >
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Rich Content Tooltip
                </Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Popover Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              Popover Components
            </CardTitle>
            <CardDescription>
              Click to open interactive popover panels with custom content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Popover
                content={
                  <div className="space-y-3">
                    <h3 className="font-semibold">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your account preferences and security settings.
                    </p>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Change Password
                      </Button>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </Popover>

              <Popover
                content={
                  <div className="space-y-3">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Star className="h-4 w-4 mr-1" />
                        Star
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                    </div>
                  </div>
                }
                placement="top"
              >
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Quick Actions
                </Button>
              </Popover>

              <Popover
                content={
                  <div className="space-y-3">
                    <h3 className="font-semibold">Newsletter Signup</h3>
                    <p className="text-sm text-muted-foreground">
                      Get the latest updates delivered to your inbox.
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 text-sm border rounded-md bg-background"
                      />
                      <Button size="sm" className="w-full">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                }
                placement="left"
                className="w-80"
              >
                <Button variant="secondary">Subscribe</Button>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-500" />
              Dropdown Components
            </CardTitle>
            <CardDescription>
              Feature-rich dropdown menus with keyboard navigation and icons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Dropdown
                items={dropdownItems}
                onSelect={(value) => console.log("Selected:", value)}
                placement="bottom-start"
              >
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  User Menu
                </Button>
              </Dropdown>

              <Dropdown
                items={[
                  {
                    label: "New File",
                    value: "new",
                    icon: <Edit className="h-4 w-4" />,
                  },
                  {
                    label: "Open",
                    value: "open",
                    icon: <Download className="h-4 w-4" />,
                  },
                  {
                    label: "Save",
                    value: "save",
                    icon: <Star className="h-4 w-4" />,
                  },
                  {
                    label: "Export",
                    value: "export",
                    icon: <Download className="h-4 w-4" />,
                  },
                ]}
                placement="bottom"
              >
                <Button>File Options</Button>
              </Dropdown>

              <Dropdown
                items={[
                  { label: "Copy", value: "copy" },
                  { label: "Cut", value: "cut" },
                  { label: "Paste", value: "paste", disabled: true },
                  { label: "Select All", value: "select-all" },
                ]}
                placement="top"
              >
                <Button variant="secondary">Edit Menu</Button>
              </Dropdown>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Keyboard Navigation:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use arrow keys to navigate menu items</li>
                <li>• Press Enter or Space to select an item</li>
                <li>• Press Escape to close the dropdown</li>
                <li>• Type to search and highlight matching items</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Floating UI Features</CardTitle>
            <CardDescription>
              Advanced positioning and interaction capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Positioning Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic collision detection</li>
                  <li>• Smart placement flipping</li>
                  <li>• Boundary-aware positioning</li>
                  <li>• Arrow pointer alignment</li>
                  <li>• Viewport constraint handling</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Interaction Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click, hover, and focus triggers</li>
                  <li>• Keyboard navigation support</li>
                  <li>• Screen reader accessibility</li>
                  <li>• Portal rendering</li>
                  <li>• Focus management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Project Components */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-orange-500" />
              Example Project Components
            </CardTitle>
            <CardDescription>
              Complete showcase of all Radix UI components with Tailwind CSS styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExampleComponents />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Link href="/contained-demo">
            <Button variant="outline">View Layout Demo</Button>
          </Link>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
