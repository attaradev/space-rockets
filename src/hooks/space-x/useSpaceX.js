import useSWR from "swr";

import { fetcher, getSpaceXUrl } from "../../utils/fetch";

export default function useSpaceX(path, options) {
  const endpointUrl = getSpaceXUrl(path, options);
  return useSWR(path ? endpointUrl : null, fetcher);
}
