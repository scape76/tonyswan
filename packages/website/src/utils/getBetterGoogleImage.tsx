const getBetterGoogleImage = (url: string) => {
  let parts = url.split("=");
  if (parts.length === 2) {
    let newSize = "s1024"; // New size to replace the old one
    parts[1] = newSize + "-c"; // Updating the size in the URL
    let modifiedURL = parts.join("="); // Rebuilding the URL
    return modifiedURL;
  } else {
    console.log("Invalid URL format");
    return url;
  }
};

export { getBetterGoogleImage };
