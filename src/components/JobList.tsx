import { useActiveId } from '../lib/hooks';
import JobListItem from './JobListItem';
import Spinner from './Spinner';

type JobListProps = {
  jobItems: any[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveId();

  return (
    <ul className='job-list'>
      {isLoading ? (
        <Spinner />
      ) : jobItems.length > 0 ? (
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={activeId === jobItem.id}
          />
        ))
      ) : (
        <li></li>
      )}
    </ul>
  );
}

export default JobList;
