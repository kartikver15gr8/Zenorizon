import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";
import { BackButton } from "@/components/terms-and-privacy/back-button";
import { ContentPointer } from "@/components/terms-and-privacy/content-pointer";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { PrivacyOptions } from "@/utils/terms-and-privacy";
import Link from "next/link";

export default function TermsConditions() {
  return (
    <>
      <BackButton />
      <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52 mb-10 lg:mb-20">
        <div className="w-full flex flex-col items-center justify-center h-16 sm:h-20">
          <p className="text-[25px] lg:text-[30px] xl:text-[40px] font-medium">
            Privacy Policy
          </p>
          <p className="text-[14px] lg:text-[15px] xl:text-[16px] text-[#b0a9a9]">
            Last updated: Jun 27, 2025
          </p>
        </div>

        {/* Overview */}
        <div className="w-full mt-5 lg:mt-10 ">
          <p className="font-medium text-[16px] md:text-[20px] xl:text-[24px]">
            Our Commitment to Privacy
          </p>
          <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px]">
            At Zenorizon, we believe that privacy is a fundamental right. Our
            open-source project management solution is built with privacy at its
            core, and we&apos;re committed to being transparent about how we handle
            your data.
          </p>
          <p className="font-extralight text-[14px] lg:text-[15px] xl:text-[17px] mt-2">
            We DO NOT keep any of your passwords or confidential information,
            All the user sessions are managed through cookies through
            authentication via browsers. We do store user emails on our servers
            with secure encryption.
          </p>
        </div>

        {/* Content */}

        <ContentPointer contentArray={PrivacyOptions} />

        <div className="mt-5 md:mt-7 lg:mt-10">
          <p className="text-[16px] md:text-[20px] xl:text-[24px] mb-1 md:mb-2">
            Reach out to us:
          </p>
          <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px]">
            If you have any queries regarding the privacy policies
          </p>
          <Link
            href={"mailto:vermakartikey786@gmail.com"}
            target="_blank"
            className="flex items-center gap-x-1 md:gap-x-2 mt-2"
          >
            <p className="text-[#b0a9a9] font-extralight text-[14px] lg:text-[15px] xl:text-[17px] hover:text-white transition-all duration-200">
              You may contact us on the given mail
            </p>
            <SVGIcon
              className="flex w-4 md:w-5"
              svgString={RAW_ICONS.MailBox}
            />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
