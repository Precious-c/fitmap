import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

interface Article {
  id: string;
  text: string;
  linkTo: string;
  icon: string;
  img: string;
}

interface ArticleCardProps {
  article: Article;
  onNavigate: (linkTo: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onNavigate,
}) => (
  <div
    style={{
      backgroundImage: `url(${article.img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="group  bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl lg:rounded-3xl  hover:bg-gray-700/30 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl"
    onClick={() => onNavigate(article.linkTo)}
  >
    <div className="h-full w-full p-6 backdrop-brightness-50 backdrop-contrast-100">
      <div className="flex flex-col h-full justify-between gap-4 ">
        <div className="flex items-start gap-4">
          <p className="text-white group-hover:text-white transition-colors leading-relaxed font-medium text-lg lg:text-base">
            {article.text}
          </p>
        </div>
        <Button className="flex gap-2 self-end bg-gradient-to-r border-2 border-accent hover:bg-accent/50 hover:border-accent/50 text-white px-4 py-2 rounded-xl font-medium transition-all group-hover:shadow-lg text-sm">
          See more
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  </div>
);
