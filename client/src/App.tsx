import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FloatingChatButton from "@/components/FloatingChatButton";
import { useEasterEgg } from "@/hooks/use-easter-egg";
import { Skeleton } from "@/components/ui/skeleton";

// Critical pages - loaded immediately
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

// Lazy load pages for better performance
const About = lazy(() => import("@/pages/about"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const CaseStudyDetail = lazy(() => import("@/pages/case-study-detail"));
const CreativeDesign = lazy(() => import("@/pages/creative-design"));
const Skills = lazy(() => import("@/pages/skills"));
const Process = lazy(() => import("@/pages/process"));
const Demos = lazy(() => import("@/pages/demos"));
const Contact = lazy(() => import("@/pages/contact"));
const DeepDives = lazy(() => import("@/pages/deep-dives"));
const WarRoomDeepDive = lazy(() => import("@/pages/deep-dives/war-room"));
const LaunchpadDeepDive = lazy(() => import("@/pages/deep-dives/launchpad"));
const SignalDeepDive = lazy(() => import("@/pages/deep-dives/signal"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));

// Lazy load heavy components
const EasterEggOverlay = lazy(() => import("@/components/EasterEggOverlay"));

// Loading component for lazy loaded pages
function PageLoader() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="container py-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-3/4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Router() {
  const { isEasterEggVisible, closeEasterEgg, triggerLogoClick } = useEasterEgg();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onLogoClick={triggerLogoClick} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about">
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          </Route>
          <Route path="/case-studies">
            <Suspense fallback={<PageLoader />}>
              <CaseStudies />
            </Suspense>
          </Route>
          <Route path="/case-studies/:id">
            <Suspense fallback={<PageLoader />}>
              <CaseStudyDetail />
            </Suspense>
          </Route>
          <Route path="/creative-design">
            <Suspense fallback={<PageLoader />}>
              <CreativeDesign />
            </Suspense>
          </Route>
          <Route path="/skills">
            <Suspense fallback={<PageLoader />}>
              <Skills />
            </Suspense>
          </Route>
          <Route path="/process">
            <Suspense fallback={<PageLoader />}>
              <Process />
            </Suspense>
          </Route>
          <Route path="/demos">
            <Suspense fallback={<PageLoader />}>
              <Demos />
            </Suspense>
          </Route>
          <Route path="/contact">
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          </Route>
          <Route path="/deep-dives">
            <Suspense fallback={<PageLoader />}>
              <DeepDives />
            </Suspense>
          </Route>
          <Route path="/deep-dives/war-room">
            <Suspense fallback={<PageLoader />}>
              <WarRoomDeepDive />
            </Suspense>
          </Route>
          <Route path="/deep-dives/launchpad">
            <Suspense fallback={<PageLoader />}>
              <LaunchpadDeepDive />
            </Suspense>
          </Route>
          <Route path="/deep-dives/signal">
            <Suspense fallback={<PageLoader />}>
              <SignalDeepDive />
            </Suspense>
          </Route>
          <Route path="/blog">
            <Suspense fallback={<PageLoader />}>
              <Blog />
            </Suspense>
          </Route>
          <Route path="/blog/:slug">
            <Suspense fallback={<PageLoader />}>
              <BlogPost />
            </Suspense>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingChatButton />
      <Suspense fallback={null}>
        {isEasterEggVisible && (
          <EasterEggOverlay 
            isVisible={isEasterEggVisible} 
            onClose={closeEasterEgg}
          />
        )}
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
