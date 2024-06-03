/* 
  Imagen componente
  the 'preview:boolean' prop is used to show the image preview in a  modal
*/

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, X } from "lucide-react";
import React from "react";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  preview: boolean;
};

export const Image: React.FC<ImageProps> = (props) => {
  const { preview, ...rest } = props;

  if (!preview) {
    // biome-ignore lint/a11y/useAltText: <explanation>
    return <img {...rest} />;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative">
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img {...rest} />

          <div className="absolute inset-0  opacity-0 hover:opacity-100 duration-300 transition-all bg-black/50 ease-in-out">
            <div
              role="button"
              className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white"
            >
              <Eye />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent unstyled>
        <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] ">
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img
            {...rest}
            className="object-contain max-h-screen overflow-y-auto w-full"
          />
        </div>

        <DialogClose className="z-[99] fixed top-4 right-4 text-muted">
          <X className="size-7" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
