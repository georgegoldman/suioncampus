import React from "react";

interface ChipProps {
  label: string;
  onDelete?: () => void; // optional delete function
}

export const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-white border border-gray-300 rounded-full mr-2">
      {label}
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-2 text-xs text-black hover:text-gray-700"
        >
          &times;
        </button>
      )}
    </div>
  );
};
