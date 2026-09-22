import { apiClient } from "@/services/api/client";

export type UploadResponse = {
  message: string;
  url: string;
  key: string;
};

function guessMimeType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  return "application/octet-stream";
}

type ReactNativeFile = {
  uri: string;
  name: string;
  type: string;
};

export async function uploadImageToS3(args: {
  uri: string;
  filename?: string;
  mimeType?: string;
  bucketName?: string;
  folder?: string;
}): Promise<UploadResponse> {
  const { uri, filename, mimeType, bucketName, folder } = args;
  const nameFromUri = filename || uri.split("/").pop() || `upload_${Date.now()}.jpg`;
  const type = mimeType || guessMimeType(nameFromUri);

  const form = new FormData();
  const file: ReactNativeFile = {
    uri,
    name: nameFromUri,
    type,
  };

  // React Native FormData expects the file object shape but TS typing only allows Blob, so coerce.
  form.append("file", file as unknown as Blob);
  if (bucketName) form.append("bucketName", bucketName);
  if (folder) form.append("folder", folder);

  return apiClient.postFormData<UploadResponse>("/api/upload", form);
}
