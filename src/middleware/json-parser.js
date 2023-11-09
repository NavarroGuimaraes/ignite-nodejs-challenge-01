export async function jsonParser(req, res) {
  const APPLICATION_JSON = "application/json";

  const buffers = [];

  // req is an async iterator
  // we must await each chunk to ensure we get the full request body
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const contentType = req.headers["content-type"];

  // we can now safely concatenate the chunks
  try {
    if (contentType === APPLICATION_JSON) {

      req.body = JSON.parse(Buffer.concat(buffers).toString());

    } else {
        req.body = Buffer.concat(buffers).toString();
    }

  } catch {
    req.body = null;
  }

  res.setHeader("Content-Type", APPLICATION_JSON);
}
