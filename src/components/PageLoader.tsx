import { Loader2Icon } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="grid min-h-screen place-items-center opacity-0 animate-[fadeIn_200ms_ease-in_1000ms_forwards]">
      <div className="animate-spin">
        <Loader2Icon className="size-10 text-gray-500" />
      </div>
    </div>
  );
};
