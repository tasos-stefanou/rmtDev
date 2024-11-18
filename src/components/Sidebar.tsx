import { JobItem } from '../lib/types';
import JobList from './JobList';
import Pagination from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

type SidebarProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export default function Sidebar({ jobItems, isLoading }: SidebarProps) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <Pagination />
    </div>
  );
}
