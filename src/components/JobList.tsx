import JobListItem from './JobListItem';
import Spinner from './Spinner';

type JobListProps = {
  jobItems: any[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className='job-list'>
      {isLoading ? (
        <Spinner />
      ) : jobItems.length > 0 ? (
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} isActive={false} />
        ))
      ) : (
        <li className='job-list'>No results found</li>
      )}
    </ul>
  );
}

export default JobList;
