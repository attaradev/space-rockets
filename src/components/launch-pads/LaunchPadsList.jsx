import { SimpleGrid, Error, Breadcrumbs, LoadMoreButton, LaunchPadItem } from "../shared";
import { useSpaceXPaginated } from "../../hooks/space-x";
import { isReachingEnd } from "../../utils/fetch";

const PAGE_SIZE = 12;

export default function LaunchPadsList() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated("/launchpads", {
    limit: PAGE_SIZE,
  });

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
        isReachingEnd={isReachingEnd(data, PAGE_SIZE)}
        isLoadingMore={isValidating}
      />
    </div>
  );
}
