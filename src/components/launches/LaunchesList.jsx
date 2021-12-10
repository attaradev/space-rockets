import { Error, Breadcrumbs, LoadMoreButton, LaunchItem, SimpleGrid } from "../shared";
import { useSpaceXPaginated } from "../../hooks/space-x";
import { isReachingEnd } from "../../utils/fetch";

const PAGE_SIZE = 12;

export default function LaunchesList() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated("/launches/past", {
    limit: PAGE_SIZE,
    order: "desc",
    sort: "launch_date_utc",
  });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launches" }]} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data.flat().map((launch) => <LaunchItem launch={launch} key={launch.flight_number} />)}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        isReachingEnd={isReachingEnd(data, PAGE_SIZE) || false}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
