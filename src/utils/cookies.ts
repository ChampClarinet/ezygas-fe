import CookiesServer from "cookies";
import CookiesClient from "universal-cookie";
import { IncomingMessage, ServerResponse } from "http";

class CookieUtils {
  getServer(name: string, req: IncomingMessage, res: ServerResponse) {
    return new CookiesServer(req, res).get(name);
  }

  getClient(name: string) {
    const client = new CookiesClient();
    return client.get(name);
  }

  setServer(
    name: string,
    value: string,
    req: IncomingMessage,
    res: ServerResponse
  ) {
    return new CookiesServer(req, res).set(name, value, { httpOnly: false });
  }

  setClient(name: string, value: string) {
    return new CookiesClient().set(name, value);
  }

  removeServer(name: string, req: IncomingMessage, res: ServerResponse) {
    return new CookiesServer(req, res).set(name);
  }

  removeClient(name: string) {
    return new CookiesClient().set(name, "", { expires: new Date(0) });
  }
}

const Cookies = new CookieUtils();
export default Cookies;
