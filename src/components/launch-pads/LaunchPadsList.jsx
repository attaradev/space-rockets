import { SimpleGrid, Error, Breadcrumbs, LoadMoreButton, LaunchPadItem } from "../shared";
import { useSpaceXPaginated } from "../../hooks";

const PAGE_SIZE = 12;

export default function LaunchPadsList() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated("/launchpads", {
    limit: PAGE_SIZE,
  });

  const isReachingEnd =
    data?.[0]?.length === 0 || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]} />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launchPad) => <LaunchPadItem key={launchPad.site_id} launchPad={launchPad} />)}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        isReachingEnd={isReachingEnd}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
