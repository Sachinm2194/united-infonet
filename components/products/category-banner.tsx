type CategoryBannerProps = {
  banner?: string;
  title: string;
};

export function CategoryBanner({ banner, title }: CategoryBannerProps) {
  if (banner) {
    return (
      <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64 lg:h-72">
        <img
          src={banner}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-5 sm:pb-6">
          <h1 className="category-banner-title relative inline-block rounded-md px-5 py-2 text-3xl font-bold text-white shadow-lg backdrop-blur-sm sm:text-4xl">
            {title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <h1 className="category-banner-title relative inline-block text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h1>
    </div>
  );
}
