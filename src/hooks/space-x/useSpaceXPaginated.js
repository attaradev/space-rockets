import { useSWRInfinite } from "swr";

import { fetcher, getSpaceXUrl } from "../../utils/fetch";

export default function useSpaceXPaginated(path, options) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher);
}
