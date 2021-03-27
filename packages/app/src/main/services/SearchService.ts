import { Service } from "./Service";
import { sleep } from "../../common_ts";
interface Item {
  html: string;
}
export class SearchService extends Service {
  async searchAll(s: string): Promise<Item[]> {
    await sleep(Math.random() * 2000 + 800);
    const result = await (await Promise.allSettled([思源Search(s)]))
      .map((el) => {
        if (el.status == "fulfilled") {
          return el.value;
        } else {
          return [
            {
              html: "查询失败",
            },
          ];
        }
      })
      .reduce((a, b) => {
        a.push(...b);
        return a;
      }, [] as Item[]);
    return result;
  }
}

function 思源Search(s: string): Promise<Item[]> {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM blocks WHERE content like '%${s}%' LIMIT 6`;
    var http = require("follow-redirects").http;

    var options = {
      method: "GET",
      hostname: "127.0.0.1",
      port: 6806,
      path: `/api/query/sql?stmt=${encodeURIComponent(sql)}`,
      headers: {},
      maxRedirects: 20,
    };

    var req = http.request(options, function (res: any) {
      var chunks: any[] = [];

      res.on("data", function (chunk: any) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk: any) {
        var body = Buffer.concat(chunks);
        const res = JSON.parse(body.toString()) as {
          data: {
            alias: "";
            box: "崮生的私人文档";
            content: "A";
            created: "20201210174443";
            ial: '{: id="20201210174443-goqb9dr" type="doc"}';
            id: "20201210174443-goqb9dr";
            length: 0;
            markdown: "";
            memo: "";
            name: "";
            parent_id: "";
            path: "/other/A.md";
            root_id: "20201210174443-goqb9dr";
            sort: 0;
            subtype: "";
            type: "d";
            updated: "";
          }[];
        };
        if (typeof res === "object" && Array.isArray(res.data)) {
          resolve(res.data.map((el) => ({ html: el.content })));
        } else {
          reject(res);
        }
      });

      res.on("error", reject);
    });

    req.end();
  });
}
