export const ContentPointer = ({
  contentArray,
}: {
  contentArray: { title: string; subTitle: string; points: string[] }[];
}) => {
  return (
    <div>
      {contentArray.map((elem, key) => {
        return (
          <div key={key} className="w-full mt-5 lg:mt-10 ">
            <p className="font-medium text-[16px] md:text-[20px] xl:text-[24px] mb-1 md:mb-2">
              {elem.title}
            </p>
            {elem.subTitle && (
              <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px] mb-1 md:mb-2">
                {elem.subTitle}
              </p>
            )}
            {elem.points.map((item, key) => {
              return (
                <li
                  key={key}
                  className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px] ml-5 sm:ml-4 md:ml-2"
                >
                  {item}
                </li>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
