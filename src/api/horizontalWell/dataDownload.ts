export const download = (data, filename, mime?) => {
    const blob = new Blob([data], { type: mime || "application/octet-stream" });
    if (typeof (window.navigator as any).msSaveBlob !== "undefined") {
      (window.navigator as any).msSaveBlob(blob, filename);
    } else {
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", filename);
      if (typeof tempLink.download === "undefined") {
        tempLink.setAttribute("target", "_blank");
      }
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }
  };
