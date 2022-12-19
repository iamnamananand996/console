import {
  ImageClassificationIcon,
  InstanceSegmentationIcon,
  KeypointDetectionIcon,
  ObjectDetectionIcon,
  OpticalCharacterRecognitionIcon,
  SemanticSegmentationIcon,
} from "@instill-ai/design-system";
import { FC } from "react";
import {
  ResourcePlaceholderBase,
  ResourcePlaceholderBaseProps,
} from "./ResourcePlaceholderBase";

export type ModelTablePlaceholderProps = {
  marginBottom: ResourcePlaceholderBaseProps["marginBottom"];
  enablePlaceholderCta: ResourcePlaceholderBaseProps["enableCta"];
};

export const ModelTablePlaceholder: FC<ModelTablePlaceholderProps> = ({
  marginBottom,
  enablePlaceholderCta,
}) => {
  const width = "w-[136px]";
  const height = "h-[136px]";

  const placeholderItems = [
    {
      id: "model-image-classification",
      item: (
        <ImageClassificationIcon
          position="m-auto"
          width={width}
          height={height}
        />
      ),
    },
    {
      id: "model-object-detection",
      item: (
        <ObjectDetectionIcon position="m-auto" width={width} height={height} />
      ),
    },
    {
      id: "model-keypoint-detection",
      item: (
        <KeypointDetectionIcon
          position="m-auto"
          width={width}
          height={height}
        />
      ),
    },
    {
      id: "model-instance-segmentation",
      item: (
        <InstanceSegmentationIcon
          position="m-auto"
          width={width}
          height={height}
        />
      ),
    },
    {
      id: "model-semantic-segmentation",
      item: (
        <SemanticSegmentationIcon
          position="m-auto"
          width={width}
          height={height}
        />
      ),
    },
    {
      id: "model-optical-character-recognition",
      item: (
        <OpticalCharacterRecognitionIcon
          position="m-auto"
          width={width}
          height={height}
        />
      ),
    },
  ];

  return (
    <ResourcePlaceholderBase
      placeholderItems={placeholderItems}
      placeholderTitle="No model"
      ctaTitle="Set up your first model"
      ctaLink="/models/create"
      marginBottom={marginBottom}
      enableCta={enablePlaceholderCta}
    />
  );
};
