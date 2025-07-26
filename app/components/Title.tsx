interface TitleProps {
  title: string;
  subtitle: string;
  align: string;
}

const Title = ({ title, subtitle, align }: TitleProps) => {
  return (
    <div
      className={`flex-col-center text-center ${
        align === "left" ? "md:items-start" : "md:text-left"
      }`}
    >
      <h1 className="font-semibold text-4xl md:text-[40px]">{title}</h1>
      <p
        className="text-sm md:text-base text-gray-400 mt-2
      max-w-156"
      >
        {subtitle}
      </p>
    </div>
  );
};

export default Title;
