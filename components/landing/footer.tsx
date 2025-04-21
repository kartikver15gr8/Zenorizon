import Image from "next/image";
import applogotwo from "@/public/assets/icons/metallogo.png";
import Link from "next/link";
import { features, product, resources } from "@/utils/footer-list-options";
import SVGIcon from "@/lib/svg-icon";
import { RAW_ICONS } from "@/lib/icons";

const featuresOpt = features;
const resourcesOpt = resources;
const productOpt = product;

export default function Footer() {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 border-t-[0.5px] border-[#565555]">
      <div className="flex items-center justify-between  border-b-[0.5px] border-[#565555] h-24 md:h-40">
        <div className="flex items-center gap-x-2 lg:gap-x-4">
          <Image
            className="w-5 sm:w-6 md:w-8 lg:w-10 xl:w-12"
            src={applogotwo}
            alt=""
            height={100}
            width={100}
          />
          <p className="text-[16px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ">
            Zenorizon
          </p>
        </div>
        <p className="text-[16px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ">
          Organise better, ship it better.
        </p>
      </div>
      {/* main content */}
      <div className="grid grid-cols-2 gap-y-10 md:gap-y-0 md:grid-cols-4 py-10">
        <div className=" col-span-1">
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-bold">
            Features
          </p>
          <ul className="flex flex-col mt-8 gap-y-4 text-[14px] lg:text-[16px] text-[#c9c9cc]">
            {featuresOpt.map((elem, key) => {
              return (
                <FooterLabel
                  key={key}
                  title={elem.title}
                  redirectHref={elem.redirectHref}
                  target={elem.target}
                />
              );
            })}
          </ul>
        </div>

        <div className=" col-span-1 ">
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-bold">
            Product
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[14px] lg:text-[16px] text-[#c9c9cc]">
            {productOpt.map((elem, key) => {
              return (
                <FooterLabel
                  key={key}
                  title={elem.title}
                  redirectHref={elem.redirectHref}
                  target={elem.target}
                />
              );
            })}
          </ul>
        </div>
        <div className=" col-span-1 ">
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-bold">
            Resources
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[14px] lg:text-[16px] text-[#c9c9cc]">
            {resourcesOpt.map((elem, key) => {
              return (
                <FooterLabel
                  key={key}
                  title={elem.title}
                  redirectHref={elem.redirectHref}
                  target={elem.target}
                />
              );
            })}
          </ul>
        </div>
        <div className=" col-span-1 ">
          <p className="text-[14px] lg:text-[16px] lg:text-xl font-bold">
            CONNECT WITH US
          </p>

          <ul className="flex flex-col mt-8 gap-y-4 text-[#c9c9cc]">
            <a
              href="https://x.com/KartikeyStack"
              target="_blank"
              className="text-lg flex items-center"
            >
              <SVGIcon className="flex w-4" svgString={RAW_ICONS.X} />
            </a>
            <a
              href="https://github.com/kartikver15gr8/zenorizon"
              target="_blank"
              className=" flex items-center"
            >
              <SVGIcon className="flex w-5" svgString={RAW_ICONS.GitHub} />
            </a>
            <a
              href="https://www.linkedin.com/in/kartikeyverma "
              target="_blank"
              className=" flex items-center"
            >
              <p className="mr-[2px]">Linked</p>
              <SVGIcon className="flex w-5" svgString={RAW_ICONS.LinkedIn} />
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}

const FooterLabel = ({
  title,
  redirectHref,
  target,
}: {
  title: string;
  redirectHref: string;
  target?: string;
}) => {
  return (
    <Link
      href={redirectHref}
      target={target}
      className="cursor-pointer hover:text-[#565555] transition-all duration-200"
    >
      {title}
    </Link>
  );
};
