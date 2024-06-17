export default function logout(req, res) {
  res.setHeader(
    "Set-Cookie",
    "access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure"
  );
  res.writeHead(302, { Location: '/' });
  res.end();
}
