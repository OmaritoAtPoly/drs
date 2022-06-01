/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
export function showFile(
  blob: Blob,
  fileName = "file.pdf",
  type = "application/pdf",
) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([blob], { type });

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  link.href = data;
  link.download = fileName;
  link.click();
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
}
