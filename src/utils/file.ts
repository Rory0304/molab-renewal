/**
 * Convert image url to file blob type
 * [name].[type] (ex: example.png)
 */
export const convertImageUrltoFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();

  const [fileName, fileType] = url.split(".");

  const metadata = { type: `image/${fileType}` };
  return new File([data], fileName, metadata);
};
