import {
  AwsRdsIcon,
  MongoDbIcon,
  MySqlIcon,
  PostgreSqlIcon,
  SalesforceIcon,
  SnowflakeIcon,
} from "@instill-ai/design-system";
import { FC } from "react";
import {
  ResourcePlaceholderBase,
  ResourcePlaceholderBaseProps,
} from "./ResourcePlaceholderBase";

export type DestinationTablePlaceholderProps = {
  marginBottom: ResourcePlaceholderBaseProps["marginBottom"];
  enablePlaceholderCta: ResourcePlaceholderBaseProps["enableCta"];
};

export const DestinationTablePlaceholder: FC<
  DestinationTablePlaceholderProps
> = ({ marginBottom, enablePlaceholderCta }) => {
  const width = "w-[136px]";
  const height = "h-[136px]";

  const placeholderItems = [
    {
      id: "destination-postgrsql",
      item: <PostgreSqlIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "destination-mysql",
      item: <MySqlIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "destination-mongodb",
      item: <MongoDbIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "destination-snowflake",
      item: <SnowflakeIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "source-saleforces",
      item: <SalesforceIcon position="m-auto" width={width} height={height} />,
    },
    {
      id: "source-aws-rds",
      item: <AwsRdsIcon position="m-auto" width={width} height={height} />,
    },
  ];

  return (
    <ResourcePlaceholderBase
      placeholderItems={placeholderItems}
      placeholderTitle="No destination"
      ctaTitle="Set up your first destination"
      ctaLink="/destinations/create"
      marginBottom={marginBottom}
      enableCta={enablePlaceholderCta}
    />
  );
};
