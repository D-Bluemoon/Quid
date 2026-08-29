import React from "react";

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="text-foreground text-center py-10">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
