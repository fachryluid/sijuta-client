import useSWR from "swr";
import fetcher from "./fetcher";

export default function swr(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  };
};