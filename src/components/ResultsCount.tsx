type ResultsCount = {
  count: number;
};

export default function ResultsCount({ count }: ResultsCount) {
  return <p className='count'>{count} results</p>;
}
