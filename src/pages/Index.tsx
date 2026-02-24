import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <PageLayout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold">
            <span className="gold-gradient">CardPerks</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            India's premier credit card perks platform — coming together piece by piece.
          </p>
        </div>
      </div>
      <BackToTop />
    </PageLayout>
  );
};

export default Index;
