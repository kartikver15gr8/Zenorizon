import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { BackButton } from "@/components/terms-and-privacy/back-button";
import { ContentPointer } from "@/components/terms-and-privacy/content-pointer";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { TermsOptions } from "@/utils/terms-and-privacy";
import Link from "next/link";

export default function TermsConditions() {
  return (
    <>
      <BackButton />
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52 mb-10 lg:mb-20">
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

        <ContentPointer contentArray={TermsOptions} />

        <div className="mt-5 md:mt-7 lg:mt-10">
          <p className="text-[16px] md:text-[20px] xl:text-[24px] mb-1 md:mb-2">
            Reach out to us:
          </p>
          <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px]">
            If you have any queries regarding the terms of service
          </p>
          <Link
            href={"https://github.com/kartikver15gr8/Zenorizon/issues"}
            className="flex items-center gap-x-1 md:gap-x-2 mt-2"
          >
            <SVGIcon
              className="flex w-3 xl:w-4"
              svgString={RAW_ICONS.GitHubIcon}
            />
            <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px] hover:text-white transition-all duration-200">
              Open an issue on GitHub
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
