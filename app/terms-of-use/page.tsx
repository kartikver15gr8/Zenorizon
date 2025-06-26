import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";

const contentArray: { title: string; subTitle: string; points: string[] }[] = [
  {
    title: "User Responsibility",
    subTitle: "",
    points: [
      "Comply with all applicable laws and regulations",
      "Maintain the security of their instance",
      "Not use the service for spam or malicious purposes",
      "Respect intellectual property rights",
      "Report security vulnerabilities responsibly",
    ],
  },
  {
    title: "Community Guidelines",
    subTitle: "Users participating in our community agree to:",
    points: [
      "Follow our code of conduct",
      "Contribute constructively to discussions",
      "Respect other community members",
      "Report inappropriate behavior",
    ],
  },
];

export default function TermsConditions() {
  return (
    <>
      <BackButton />
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52">
        <div className="w-full flex flex-col items-center justify-center h-16 sm:h-20">
          <p className="text-[25px] lg:text-[30px] xl:text-[40px] font-medium">
            Terms of Service
          </p>
          <p className="text-[14px] lg:text-[15px] xl:text-[16px] text-[#b0a9a9]">
            Last updated: Jun 26, 2025
          </p>
        </div>

        {/* Overview */}
        <div className="w-full mt-5 lg:mt-10 ">
          <p className="font-medium text-[16px] md:text-[20px] xl:text-[24px]">
            Overview
          </p>
          <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px]">
            Zenorizon is an open-source modern issue tracking and project
            management tool built for high-performing teams. By using Zenorizon,
            you agree these terms.
          </p>
        </div>

        {/* Content */}

        <ContentPointer contentArray={contentArray} />
      </div>
      <Footer />
    </>
  );
}

const ContentPointer = ({
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
                  className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px]"
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

const BackButton = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52 py-4 flex items-center">
      <Link
        href={"/"}
        className="border border-[#3e3c43] bg-[#33333760] hover:bg-[#45414170] transition-all duration-300 pl-3 pr-4 h-8 rounded-full flex items-center gap-x-1 cursor-pointer"
      >
        <SVGIcon
          className="flex w-3 md:w-4 rotate-180"
          svgString={RAW_ICONS.BackArrow}
        />
        <p className="text-[14px] lg:text-[15px] xl:text-[16px]">back</p>
      </Link>
    </div>
  );
};
