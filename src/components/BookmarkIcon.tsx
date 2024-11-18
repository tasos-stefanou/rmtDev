import { BookmarkFilledIcon } from '@radix-ui/react-icons';

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className='bookmark-btn'
    >
      <BookmarkFilledIcon
        className={`
        ${false ? 'filled' : ''}
      `}
      />
    </button>
  );
}
