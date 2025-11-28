import Image from "next/image";

type MovieImageProps = {
  backdrop_path?: string;
  title: string;
  className: string;
  loading?: boolean;
};

export const MovieImage = ({
  backdrop_path,
  title,
  className,
  loading,
}: MovieImageProps) => {
  console.log();

  const imgUrl = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  const img = backdrop_path ? imgUrl : "/film (1).png";
  console.log({ backdrop_path });

  if (loading) return <>loaidng....</>;

  return (
    <img
      src={img}
      alt={title}
      className={className}
      style={{ objectFit: "cover" }}
      loading="eager"
    />
  );
};
