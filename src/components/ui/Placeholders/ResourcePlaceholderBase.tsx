import { Fragment, ReactElement } from "react";
import { useRouter } from "next/router";
import cn from "clsx";
import { SolidButton } from "@instill-ai/design-system";
import { Nullable } from "@/types/general";

export type ResourcePlaceholderBaseProps = {
  placeholderItems: {
    id: string;
    item: ReactElement;
  }[];
  placeholderTitle: string;
  ctaTitle: string;
  ctaLink: string;
  marginBottom: Nullable<string>;
  enableCta: boolean;
};

export const ResourcePlaceholderBase = ({
  placeholderItems,
  placeholderTitle,
  ctaTitle,
  ctaLink,
  marginBottom,
  enableCta,
}: ResourcePlaceholderBaseProps) => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(ctaLink);
  };
  return (
    <div
      className={cn(
        "flex min-h-[300px] w-full flex-row border border-instillGrey15 bg-white px-[9px] py-[18px]",
        marginBottom
      )}
    >
      <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-2 px-[27px] opacity-10">
        {placeholderItems.map((e) => (
          <Fragment key={e.id}>{e.item}</Fragment>
        ))}
      </div>
      <div className="m-auto flex flex-col gap-y-5">
        <h3 className="text-instill-h3 text-instillGrey80">
          {placeholderTitle}
        </h3>
        {enableCta ? (
          <SolidButton
            type="button"
            color="primary"
            disabled={false}
            onClickHandler={handleOnClick}
            position={null}
          >
            {ctaTitle}
          </SolidButton>
        ) : null}
      </div>
    </div>
  );
};
