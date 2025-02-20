import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request Failed with Status ${response.status}: ${errorText} `
      );
    }
    const data = await response.json();
    const { token, expire, signature } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication error: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
}

const ImageUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const { toast } = useToast();
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-100"
        : "bg-light-600 border border-gray-100",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} has been uploaded successfully`,
    });
  };
  const onError = (error: any) => {
    console.log(error);
    toast({
      title: `${type} upload Failed`,
      description: `Your ${type} Could Not Be Uploaded, Please Try Again`,
      variant: "destructive",
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 20MB",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 20MB",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        className="hidden"
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgress(precent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>
      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default ImageUpload;
