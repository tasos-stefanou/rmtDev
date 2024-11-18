import Background from './Background';
import Header from './Header';
import Container from './Container';
import Footer from './Footer';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar from './Sidebar';
import { useJobItems, useSearchTextContext } from '../lib/hooks';

function App() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  const { jobItems, isLoading } = useJobItems(searchText);

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
        <Sidebar jobItems={jobItems} isLoading={isLoading} />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
