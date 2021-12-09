import { Error, Breadcrumbs, LoadMoreButton, LaunchItem, SimpleGrid } from "../shared";
import { useSpaceXPaginated } from "../../hooks";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated("/launches/past", {
    limit: PAGE_SIZE,
    order: "desc",
    sort: "launch_date_utc",
  });

  const isReachingEnd =
    data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < PAGE_SIZE);

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
        isReachingEnd={isReachingEnd}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
