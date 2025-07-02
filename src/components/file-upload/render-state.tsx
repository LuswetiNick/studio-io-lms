import { cn } from "@/lib/utils";
import { Upload, ImageUp, Trash2, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { Progress } from "../ui/progress";
export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center flex flex-col gap-2">
      <p className="text-lg font-medium">Drop file here or click to upload</p>

      <Button type="button" className="mt-4 bg-transparent" variant="outline">
        <Upload className="h-4 w-4 " />
        Choose File
      </Button>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <ImageUp className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-sm text-muted-foreground">
        Oops! Something went wrong
      </p>
      <Button type="button" className="mt-4 bg-transparent" variant="outline">
        <Upload className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  fileType,
  handleDelete,
}: {
  previewUrl: string;
  isDeleting: boolean;
  fileType: "image" | "video";
  handleDelete: () => void;
}) => {
  return (
    <div className="relative  w-full h-full flex flex-col items-center justify-center">
      <div className="relative group w-full h-48 flex items-center justify-center mb-4">
        {fileType === "image" ? (
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-contain rounded-md"
          />
        ) : (
          <video 
            src={previewUrl} 
            className="w-full h-full object-contain rounded-md"
            controls
            preload="metadata"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </div>
      <Button
        onClick={handleDelete}
        type="button"
        size="icon"
        className="absolute top-2 right-2"
        variant="destructive"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Trash2 className="size-4" />
        )}
      </Button>
    </div>
  );
};

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <Progress value={progress} className="w-[60%]" />
      <TextShimmerWave className="font-mono text-sm mt-2 truncate" duration={1}>
        {`Uploading ${file.name}...`}
      </TextShimmerWave>
    </div>
  );
};
