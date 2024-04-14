import { useVerification } from "./useVerification";
import type { ViewStockData } from "../types";
import type {
  IStocksData,
  SingleConsultStock,
} from "../../server/types/advancedMisc";
import axios from "axios";

export function useStockViewer() {
  const { errorAuth, token } = useVerification();
  const viewStock = async ({ stock, like }: ViewStockData) => {
    if (typeof stock === "string") {
      const resultView = await axios<SingleConsultStock>({
        url: `/${
          import.meta.env.VITE_ROUTE_API
        }/advanced-misc/stock-prices?stock=${stock}&like=${like}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(({ data }) => data)
        .catch(err => {
          console.error(err);
          return err.response.data.error as string;
        });
      return resultView;
    } else {
      const resultView = await axios<IStocksData>({
        url: `/${
          import.meta.env.VITE_ROUTE_API
        }/advanced-misc/stock-prices?stock=${stock[0]}&stock=${
          stock[1]
        }&like=${like}`,
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(({ data }) => data)
        .catch(err => {
          console.error(err);
          return err.response.data.error as string;
        });
      return resultView;
    }
  };

  return {
    errorAuth,
    token,
    viewStock,
  };
}
