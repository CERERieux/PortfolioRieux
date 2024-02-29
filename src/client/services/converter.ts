import axios from "axios";
import type { ConverterResult } from "../types";

export function convertUnit(dataConvert: string) {
  return axios<ConverterResult>({
    url: `/cYSvQmg9kR/advanced/converter?input=${dataConvert}`,
    method: "get",
  })
    .then(({ data }) => data)
    .catch(err => {
      console.error(err);
      return { error: err.response.data.error.error as string };
    });
}
