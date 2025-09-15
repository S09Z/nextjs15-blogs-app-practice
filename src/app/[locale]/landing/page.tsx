"use client";

import { PageLayout } from "@/components/layouts";
import { AnimatedBackground } from "@/components/landing/animated-background";
import { FloatingElements } from "@/components/landing/floating-elements";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";

export default function LandingPage() {
  return (
    <PageLayout template="blank" className="relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Interactive Elements */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* CTA Section */}
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already building amazing
                experiences with our platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Start Building Now
                </button>
                <button className="px-8 py-3 border border-white/20 text-foreground rounded-lg font-medium hover:bg-white/10 transition-all duration-300">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using Next.js, Floating UI, and Tailwind CSS
          </p>
        </div>
      </footer>
    </PageLayout>
  );
}
