import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, User, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { getGuideBySlug } from "@/data/guides";
import { Badge } from "@/components/ui/badge";

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug || "");
  const { toggle, isFav } = useFavorites("guide");

  if (!guide) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Guide Not Found</h1>
          <Link to="/guides" className="text-gold hover:underline">← Back to guides</Link>
        </div>
      </PageLayout>
    );
  }

  const Icon = guide.icon;

  return (
    <PageLayout>
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/guides" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>

        <ScrollReveal>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${guide.color}22` }}>
                <Icon className="w-5 h-5" style={{ color: guide.color }} />
              </div>
              <Badge variant="secondary">{guide.category}</Badge>
              <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggle(guide.slug)} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{guide.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{guide.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {guide.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {guide.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {guide.readTime}</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {guide.content.map((block, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div className="max-w-none">
                {block.split("\n").map((line, j) => {
                  if (line.startsWith("## ")) return <h2 key={j} className="text-xl font-bold text-foreground mt-8 mb-3">{line.replace("## ", "")}</h2>;
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={j} className="font-semibold text-foreground">{line.replace(/\*\*/g, "")}</p>;
                  if (line.match(/^\d+\./)) return <p key={j} className="text-muted-foreground ml-4">{line}</p>;
                  if (line.startsWith("- ")) return <p key={j} className="text-muted-foreground ml-4">{line}</p>;
                  if (line.trim() === "") return null;
                  return <p key={j} className="text-muted-foreground leading-relaxed">{line}</p>;
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {guide.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
        </div>
      </article>
    </PageLayout>
  );
}
