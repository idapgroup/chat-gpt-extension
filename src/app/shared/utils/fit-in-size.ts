export  const fitInSize = (file: File, maxFileSize: number | null) => {
  if (!maxFileSize) {
    return true;
  }
  const fileSize = file.size / Math.pow(1024, 2);
  return !isNaN(fileSize) && fileSize <= maxFileSize;
}
