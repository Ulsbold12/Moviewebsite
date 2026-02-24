export const MovieImage = ({
  backdrop_path,
  title,
  className,
}: {
  backdrop_path?: string | null;
  title: string;
  className?: string;
}) => {
  const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

  if (!backdrop_path) {
    return (
      <div
        className={`${className} bg-gray-200 flex flex-col items-center justify-center rounded-t-xl`}>
        <div className="text-3xl">🎬</div>
        <p className="text-xs text-gray-600 mt-2 text-center px-2 line-clamp-2">
          {title}
        </p>
      </div>
    );
  }

  return (
    <img
      src={`${TMDB_IMG}${backdrop_path}`}
      alt={title}
      className={`${className} object-cover rounded-t-xl`}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/no-poster.png";
      }}
    />
  );
};
