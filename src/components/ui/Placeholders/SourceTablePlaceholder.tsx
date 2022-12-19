import {
  AwsS3Icon,
  GcsIcon,
  GoogleDriveIcon,
  IotIcon,
  MongoDbAtalasIcon,
} from "@instill-ai/design-system";
import { FC } from "react";
import {
  ResourcePlaceholderBase,
  ResourcePlaceholderBaseProps,
} from "./ResourcePlaceholderBase";

export type SourceTablePlaceholderProps = {
  marginBottom: ResourcePlaceholderBaseProps["marginBottom"];
  enablePlaceholderCta: ResourcePlaceholderBaseProps["enableCta"];
};

export const SourceTablePlaceholder: FC<SourceTablePlaceholderProps> = ({
  marginBottom,
  enablePlaceholderCta,
}) => {
  const width = "w-[136px]";
  const height = "h-[136px]";

  const placeholderItems = [
    {
      id: "source-gcs",
      item: <GcsIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "source-mongodb-atalas=1",
      item: (
        <MongoDbAtalasIcon position="m-auto" width={width} height={height} />
      ),
    },
    {
      id: "source-iot",
      item: <IotIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "source-mongodb-atalas-2",
      item: (
        <MongoDbAtalasIcon position="m-auto" width={width} height={height} />
      ),
    },
    {
      id: "source-aws-s3",
      item: <AwsS3Icon position="m-auto" width={width} height={height} />,
    },
    {
      id: "source-google-drive",
      item: <GoogleDriveIcon position="m-auto" width={width} height={height} />,
    },
  ];

  return (
    <ResourcePlaceholderBase
      placeholderItems={placeholderItems}
      placeholderTitle="No source"
      ctaTitle="Set up your first source"
      ctaLink="/sources/create"
      marginBottom={marginBottom}
      enableCta={enablePlaceholderCta}
    />
  );
};
