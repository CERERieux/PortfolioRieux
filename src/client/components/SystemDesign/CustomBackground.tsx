interface BackgroundImg {
  children: React.ReactNode;
  bgImg: string;
  styles?: string;
}

export default function CustomBackground({
  bgImg,
  children,
  styles,
}: BackgroundImg) {
  return (
    <div
      className={`before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full ${bgImg} before:bg-no-repeats before:bg-cover before:content-[''] ${styles}`}
    >
      {children}
    </div>
  );
}
