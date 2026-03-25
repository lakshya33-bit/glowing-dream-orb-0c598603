import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path={location.pathname} />
      <div className="flex items-center justify-center py-32">
        <div className="text-center max-w-md px-4">
          <p className="text-7xl font-serif font-bold gold-gradient mb-4">404</p>
          <h1 className="text-xl font-semibold mb-2">Page not found</h1>
          <p className="text-sm text-muted-foreground mb-8">
            The page <span className="text-foreground font-medium">{location.pathname}</span> doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="gold-btn px-6 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
              <Home className="w-4 h-4" /> Go Home
            </Link>
            <button onClick={() => window.history.back()} className="px-6 py-2.5 rounded-xl text-sm font-medium glass-card border border-border/40 hover:border-gold/30 transition-colors inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
