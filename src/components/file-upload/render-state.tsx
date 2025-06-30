import { cn } from "@/lib/utils";
import { Upload, ImageUp, Trash2, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center flex flex-col gap-2">
      <div className="space-y-2">
        <p className="text-lg font-medium">Drop file here or click to upload</p>
        <p className="text-sm text-muted-foreground">
          Support for images (JPG, PNG)
        </p>
        <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
      </div>
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
  handleDelete,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleDelete: () => void;
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-success/30 mb-4">
        <Image
          src={previewUrl}
          alt="Preview"
          fill
          className="object-contain p-4"
        />
      </div>
      <Button
        onClick={handleDelete}
        type="button"
        size="icon"
        className={cn("absolute top-4 right-4")}
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
      <p>{progress}%</p>
      <TextShimmerWave className="font-mono text-sm mt-2 truncate" duration={1}>
        {`Uploading ${file.name}...`}
      </TextShimmerWave>
    </div>
  );
};
