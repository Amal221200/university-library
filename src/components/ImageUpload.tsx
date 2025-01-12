"use client"
import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IKUploadResponse, UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

interface Props {
  onFileChange: (filePath: string) => void
}

const ImageUpload = ({ onFileChange }: Props) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const { toast } = useToast();

  const onError = (error: UploadError) => {
    console.log(error);

    toast({
      title: "Image Uploaded Failed",
      description: `Your image could not be uploaded. Please try again`,
      variant: "destructive"
    })
  }
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: "Image Uploaded Successfully",
      description: `${res.filePath} has been uploaded successfully`,
    })
  }
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload className="hidden" ref={ikUploadRef} onSuccess={onSuccess} onError={onError} fileName="test-upload.png" />
      <button type="button" className="upload-btn" onClick={(e) => {
        e.preventDefault()
        if (ikUploadRef.current) {
          ikUploadRef.current?.click()
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload" width={20} height={20} className="object-contain" />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />}
    </ImageKitProvider>
  )
}

export default ImageUpload
