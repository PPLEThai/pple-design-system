import { Button } from "@pplethai/components";
import { Github, Star } from "lucide-react";
import * as React from "react";

const REPO = "PPLEThai/pple-design-system";

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}

export function GitHubStar() {
  const [stars, setStars] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Button asChild variant="outline" size="sm">
      <a
        href={`https://github.com/${REPO}`}
        target="_blank"
        rel="noreferrer"
        aria-label={
          stars !== null
            ? `Star ${REPO} on GitHub — ${stars} stars`
            : `Star ${REPO} on GitHub`
        }
      >
        <Github />
        <span>Star</span>
        {stars !== null ? (
          <>
            <span aria-hidden="true" className="mx-1 h-4 w-px bg-current opacity-30" />
            <Star className="size-3.5 fill-current" />
            <span>{formatStars(stars)}</span>
          </>
        ) : null}
      </a>
    </Button>
  );
}
