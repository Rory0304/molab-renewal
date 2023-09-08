import { getServerSupabase } from "src/utils/supabase";

const supabase = getServerSupabase();

/**
 * Convert supabse image url to file blob type
 * [public url].[type]
 */
export const convertImageUrltoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  const regexPattern = /\/([^/]+)\.([^/.]+)$/;
  const match = url.match(regexPattern);

  if (match) {
    const fileName = url;
    const fileExtension = match[2];

    const metadata = { type: `image/${fileExtension}` };
    return new File([data], fileName, metadata);
  }

  return null;
};

/**
 * Download supabase file
 */
export const downloadFile = async (from: string, url: string) => {
  const { data, error } = await supabase.storage.from(from).download(url);

  if (error) {
    throw new Error("fail to download file");
  }

  return data;
};
