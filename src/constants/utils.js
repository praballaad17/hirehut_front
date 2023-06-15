export function processWebsiteInput(website) {
  // Remove leading and trailing whitespaces\
  console.log(website);
  website = website.trim();

  if (website === "" || website === "https://") {
    return "";
  }

  // Check if the input alreadyr stats with "https://" or "http://"
  if (website.startsWith("https://") || website.startsWith("http://")) {
    // Remove any "http://" occurrences
    website = website.replace(/http:\/\//g, "");
  } else {
    // Prepend "https://" if it doesn't start with any protocol
    website = "https://" + website;
  }

  // Remove any path or query parameters after the domain
  try {
    const url = new URL(website);
    console.log(url);
    return url.href;
  } catch (error) {
    console.log(error);
    return "";
  }
}
