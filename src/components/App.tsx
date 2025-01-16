import Background from './Background';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar from './Sidebar';
import { useJobItems, useSearchTextContext } from '../lib/hooks';
import { RESULTS_PER_PAGE } from '../lib/constants';

function App() {
  const { searchText, debouncedSearchText, handleChangeSearchText } =
    useSearchTextContext();

  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const jobItemsSliced = jobItems.slice(0, RESULTS_PER_PAGE);
  const totalNumberOfResults = jobItems.length;
  return (
    <>
      <Background />
      <Header>
        <SearchForm
          searchText={searchText}
          handleChangeSearchText={handleChangeSearchText}
        />
      </Header>
      <Container>
        <Sidebar
          jobItems={jobItemsSliced}
          isLoading={isLoading}
          totalNumberOfResults={totalNumberOfResults}
        />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
