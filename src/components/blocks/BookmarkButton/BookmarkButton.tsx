import React from 'react';

import HeartOutlineIcon from '@heroicons/react/24/outline/StarIcon';
import HeartFillIcon from '@heroicons/react/24/solid/StarIcon';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <button
      type="button"
      className="btn btn-circle p-0 w-auto min-h-0 h-auto bg-transparent border-none hover:bg-transparent"
      onClick={onToggleBookmark}
    >
      {isBookmarked ? (
        <HeartFillIcon className="h-6 w-6 text-yellow-500 stroke-white" />
      ) : (
        <HeartOutlineIcon color="white" width={24} height={24} />
      )}
    </button>
  );
};

export default BookmarkButton;
