import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Grid, SearchInput } from "@client/shared/components";
import InfiniteScroll from "react-infinite-scroll-component";
import { noop } from "src/client/shared/constants";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

const ProjectsView = ({
  columnConfig = [],
  entries = [],
  totalEntries = 0,
  order = null,
  orderBy = null,
  isSearching = false,
  isCustomer = false,
  handleLoadMore = noop,
  handleSearch = noop,
  handleSorting = noop,
}) => {
  const renderLoadMoreLoader = () => {
    return [...new Array(1)].map(() => <Skeleton height="42px" />);
  };

  return (
    <Box>
      <Box
        sx={{
          marginTop: "84px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontFamily: "inter_bold" }} variant="h4">
          Cloud Relay Projects
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchInput isLoading={isSearching} onChange={handleSearch} />
        {!isCustomer && (
          <Box
            component={Link}
            to="/projects/new"
            sx={{
              ml: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <NoteAddOutlinedIcon sx={{ color: "grey.700", fontSize: "44px" }} />
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                textAlign: "center",
                fontFamily: "inter_bold",
                color: "rgb(58,101,5)",
                fontSize: "18px",
              }}
            >
              New Project
            </Typography>
          </Box>
        )}
      </Box>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <InfiniteScroll
            dataLength={entries.length}
            next={handleLoadMore}
            hasMore={entries.length < totalEntries}
            loader={renderLoadMoreLoader()}
            height={560}
            endMessage={
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  fontFamily: "inter_bold",
                }}
              >
                {!totalEntries ? "" : "You have seen it all!"}
              </Typography>
            }
          >
            <Grid
              columns={columnConfig}
              rows={entries}
              totalRows={totalEntries}
              hasSelection={false}
              hasPagination={false}
              onSortChange={handleSorting}
              order={order}
              orderBy={orderBy}
            />
          </InfiniteScroll>
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectsView;
